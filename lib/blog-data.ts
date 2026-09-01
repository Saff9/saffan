export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  category: 'Systems Engineering' | 'Database Internals' | 'Compilers & Languages' | 'AI & Architecture';
  readTime: string;
  tags: string[];
  featured?: boolean;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'novadb-c11-btree-internals',
    slug: 'novadb-c11-btree-internals',
    title: 'Inside NovaDB: Implementing an ACID B+ Tree in Pure C11',
    summary:
      'How I engineered an ACID-compliant B+ Tree storage engine from scratch in standard C11 without external dependencies, implementing slotted pages, WAL logging, and LRU-K frame eviction.',
    publishedAt: '2026-08-15',
    category: 'Database Internals',
    readTime: '8 min read',
    tags: ['C11', 'NovaDB', 'B-Tree', 'WAL', 'ACID', 'Systems'],
    featured: true,
    content: `## Demystifying Database Engines from the Metal Up

Most modern developers interact with databases via ORMs and high-level query languages, treating the underlying storage engine as an opaque black box. When write amplification spikes, page cache thrashing occurs, or transaction deadlocks freeze a cluster, understanding the low-level disk mechanics becomes critical.

To truly understand how databases guarantee durability and achieve sub-millisecond lookups, I built **NovaDB** — a standalone relational database engine in pure ANSI C11 with zero external libraries.

### 1. Slotted-Page Disk Architecture

A database cannot read individual fields directly from disk; it reads and writes in fixed-size blocks (typically 4096 bytes, matching native OS page cache boundaries).

NovaDB uses a **Slotted-Page Architecture**:
- **Page Header**: Contains page ID, LSN (Log Sequence Number), free space pointer, and slot count.
- **Slot Array**: Grows downwards from the header, storing byte offsets and lengths of records.
- **Tuples / Records**: Serialized binary payloads growing upwards from the bottom of the page.

\`\`\`c
typedef struct {
    uint32_t page_id;
    uint64_t lsn;
    uint16_t num_slots;
    uint16_t free_space_offset;
} PageHeader;

typedef struct {
    uint16_t offset;
    uint16_t length;
} PageSlot;
\`\`\`

This design allows instant O(1) tuple lookup by \`RecordID { page_id, slot_id }\` without moving other records during in-place updates.

### 2. B+ Tree Indexing & Concurrency

NovaDB indexes tables using a custom B+ Tree where:
1. All data pointers (RecordIDs) reside strictly in leaf nodes.
2. Internal nodes only store routing keys and child page pointers.
3. Leaf nodes are linked via bidirectional sibling pointers for O(log N + K) range scans.

When a leaf node exceeds \`BTREE_MAX_KEYS\`, NovaDB allocates a new page from the Buffer Pool Manager, redistributes keys evenly (50/50 split), and propagates the median key to the parent node.

### 3. Write-Ahead Logging (WAL) & Crash Recovery

Atomicity and Durability (the A and D in ACID) are guaranteed via strict Write-Ahead Logging:
- Before any modified database page is written to disk, the corresponding log record must be flushed to the WAL file via \`fsync()\`.
- If the system experiences a power loss or crash, NovaDB executes the **ARIES Recovery Protocol**:
  1. **Analysis Phase**: Identifies active transactions and dirty pages at the time of crash.
  2. **Redo Phase**: Replays all logged operations to restore the database to the exact pre-crash state.
  3. **Undo Phase**: Rolls back all uncommitted transactions to maintain consistency.

\`\`\`c
// Flushing WAL record with POSIX fsync
int wal_flush_log(WALManager *wal) {
    if (wal->buffer_offset > 0) {
        ssize_t written = write(wal->fd, wal->buffer, wal->buffer_offset);
        if (written < 0) return -1;
        if (fsync(wal->fd) < 0) return -1;
        wal->buffer_offset = 0;
    }
    return 0;
}
\`\`\`

Building NovaDB proved that true systems understanding comes from writing raw memory management and concurrent disk protocols from first principles.
`,
  },
  {
    id: 'breeze-pratt-parser-architecture',
    slug: 'breeze-pratt-parser-architecture',
    title: 'Writing a Pratt Parser for the Breeze Language',
    summary:
      'A deep architectural breakdown of Vaughan Pratt’s top-down operator precedence parsing algorithm and how it powers the custom Breeze language syntax tree.',
    publishedAt: '2026-07-22',
    category: 'Compilers & Languages',
    readTime: '6 min read',
    tags: ['TypeScript', 'Compilers', 'AST', 'Pratt Parsing', 'Breeze'],
    featured: true,
    content: `## Why Traditional Recursive Descent Struggles with Expressions

When building a programming language interpreter or compiler, writing recursive descent parsing functions for simple statements (\`let x = 5;\`, \`return y;\`) is straightforward.

However, arithmetic and binary expressions (\`a + b * c ^ d\`) introduce operator precedence and associativity challenges. In standard recursive descent, you often need to create nested grammar rules for every precedence tier: \`parsePrimary\`, \`parseUnary\`, \`parseMultiplication\`, \`parseAddition\`, leading to deep call stacks and bloated boilerplate.

In building **Breeze**, I implemented **Vaughan Pratt’s Top-Down Operator Precedence Parsing Algorithm**.

### The Core Philosophy of Pratt Parsing

Instead of binding grammar to BNF parser functions, Pratt parsing associates parsing functions directly with **token types**:

1. **Prefix Parse Functions (\`prefixParseFns\`)**: Handles tokens in prefix positions (e.g. integer literals, identifiers, unary operators \`-x\`, \`!valid\`, grouped expressions \`(a + b)\`).
2. **Infix Parse Functions (\`infixParseFns\`)**: Handles tokens in infix positions (e.g. binary operators \`+\`, \`-\`, \`*\`, \`/\`, comparison operators \`==\`, and postfix function calls \`foo(x)\`).

\`\`\`typescript
export class Parser {
  private prefixParseFns = new Map<TokenType, PrefixParseFn>();
  private infixParseFns = new Map<TokenType, InfixParseFn>();

  parseExpression(precedence = Precedence.LOWEST): AST.Expression {
    const prefix = this.prefixParseFns.get(this.currentToken.type);
    if (!prefix) {
      throw new Error(\`No prefix parse function found for \${this.currentToken.literal}\`);
    }

    let leftExp = prefix();

    while (!this.peekTokenIs(TokenType.SEMICOLON) && precedence < this.peekPrecedence()) {
      const infix = this.infixParseFns.get(this.peekToken.type);
      if (!infix) return leftExp;

      this.nextToken();
      leftExp = infix(leftExp);
    }

    return leftExp;
  }
}
\`\`\`

### Evaluating Associativity

By varying the precedence parameter passed into \`parseExpression()\` during right-hand recursive calls:
- **Left-Associative (\`+\`, \`-\`, \`*\`):** Pass \`currentPrecedence\`.
- **Right-Associative (\`^\` exponentiation, \`=\` assignment):** Pass \`currentPrecedence - 1\`.

This elegant loop parses arbitrarily complex mathematical and logical expressions with minimal overhead and clean AST generation.
`,
  },
  {
    id: 'astramind-multi-agent-dag-orchestration',
    slug: 'astramind-multi-agent-dag-orchestration',
    title: 'Orchestrating Autonomous Multi-Agent DAGs in ASTRAMIND',
    summary:
      'Designing low-latency, deterministic multi-agent execution graphs with isolated tool runtimes, vector memory recall, and streaming telemetry in Python.',
    publishedAt: '2026-06-10',
    category: 'AI & Architecture',
    readTime: '7 min read',
    tags: ['Python', 'FastAPI', 'ASTRAMIND', 'AI Agents', 'DAG', 'Distributed'],
    featured: false,
    content: `## Beyond Single-Prompt LLM Chains

Single LLM prompts and naive sequential chains frequently fail on complex, multi-step engineering tasks due to context drift, hallucinated dependencies, and unconstrained tool execution.

**ASTRAMIND** was engineered to solve this through **Directed Acyclic Graph (DAG) Execution**:
1. **Planner Agent**: Decomposes a high-level goal into discrete, verifiable subtasks with explicit dependencies.
2. **Context Memory & Embeddings**: Semantic retrieval against a vector store (Qdrant / pgvector) providing relevant code context without flooding the prompt window.
3. **Execution Runtime**: Evaluates parallel independent DAG nodes concurrently using asynchronous Python runtimes.

\`\`\`python
async def execute_dag_plan(plan: ExecutionPlan) -> AsyncGenerator[ExecutionEvent, None]:
    completed_nodes: set[str] = set()
    
    while len(completed_nodes) < len(plan.nodes):
        ready_nodes = [
            n for n in plan.nodes
            if n.id not in completed_nodes and n.dependencies.issubset(completed_nodes)
        ]
        
        # Execute ready nodes concurrently
        tasks = [run_node_isolated(node) for node in ready_nodes]
        for completed_task in asyncio.as_completed(tasks):
            result = await completed_task
            completed_nodes.add(result.node_id)
            yield ExecutionEvent(type="NODE_SUCCESS", payload=result)
\`\`\`

### Ensuring Zero-Leak Tool Isolation

Every tool execution (e.g. bash commands, file edits, git operations) executes inside an isolated sandbox with resource budgets (memory limits, timeout ceilings, and strict exit code validation), preventing accidental infinite loops or memory leaks.

ASTRAMIND serves as a production blueprint for reliable autonomous agent orchestrators.
`,
  },
];
