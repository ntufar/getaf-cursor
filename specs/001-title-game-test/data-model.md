# Data Model: Game Test Automation Practice Project

**Date**: 2025-01-27  
**Branch**: `001-title-game-test`  
**Purpose**: Define core entities and their relationships for the automation framework

## Core Entities

### AutomationFramework
**Purpose**: Core system providing test automation capabilities with layered architecture

**Attributes**:
- `id`: Unique identifier (UUID)
- `name`: Framework name (string, required)
- `version`: Framework version (semantic versioning)
- `status`: Current status (enum: ACTIVE, INACTIVE, MAINTENANCE)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp
- `configuration`: Framework configuration (JSON object)
- `performance_metrics`: Performance tracking data (JSON object)

**Relationships**:
- One-to-Many with TestSuite
- One-to-Many with BuildPipeline
- One-to-Many with GameEngineIntegration

**Validation Rules**:
- Name must be unique within the system
- Version must follow semantic versioning (MAJOR.MINOR.PATCH)
- Configuration must be valid JSON
- Status must be one of the defined enum values

**State Transitions**:
- INACTIVE → ACTIVE (framework activation)
- ACTIVE → MAINTENANCE (scheduled maintenance)
- MAINTENANCE → ACTIVE (maintenance completion)

### TestSuite
**Purpose**: Collection of automated tests covering unit, integration, and end-to-end scenarios

**Attributes**:
- `id`: Unique identifier (UUID)
- `name`: Test suite name (string, required)
- `description`: Test suite description (text)
- `type`: Test type (enum: UNIT, INTEGRATION, E2E, PERFORMANCE)
- `language`: Programming language (enum: CPP, CSHARP, PYTHON)
- `framework_id`: Reference to AutomationFramework (UUID, foreign key)
- `test_count`: Number of tests in suite (integer)
- `execution_time`: Average execution time in seconds (integer)
- `success_rate`: Success rate percentage (decimal, 0-100)
- `last_execution`: Last execution timestamp
- `configuration`: Test suite configuration (JSON object)
- `data_sources`: Test data sources (array of strings)

**Relationships**:
- Many-to-One with AutomationFramework
- One-to-Many with PerformanceMetrics

**Validation Rules**:
- Name must be unique within framework
- Test count must be non-negative
- Success rate must be between 0 and 100
- Execution time must be non-negative
- Language must be one of the supported languages

**State Transitions**:
- Test suite can be enabled/disabled
- Configuration can be updated without affecting active tests

### BuildPipeline
**Purpose**: CI/CD workflow managing code compilation, testing, and deployment

**Attributes**:
- `id`: Unique identifier (UUID)
- `name`: Pipeline name (string, required)
- `description`: Pipeline description (text)
- `type`: Pipeline type (enum: CONTINUOUS_INTEGRATION, CONTINUOUS_DEPLOYMENT, NIGHTLY_BUILD)
- `status`: Current status (enum: RUNNING, SUCCESS, FAILED, CANCELLED, PENDING)
- `trigger_type`: Trigger type (enum: MANUAL, SCHEDULED, WEBHOOK, PUSH)
- `framework_id`: Reference to AutomationFramework (UUID, foreign key)
- `stages`: Pipeline stages configuration (JSON array)
- `artifacts`: Generated artifacts (array of strings)
- `execution_time`: Total execution time in seconds (integer)
- `started_at`: Pipeline start timestamp
- `completed_at`: Pipeline completion timestamp
- `triggered_by`: User who triggered the pipeline (string)
- `environment`: Target environment (enum: DEV, STAGING, PRODUCTION)

**Relationships**:
- Many-to-One with AutomationFramework
- One-to-Many with PerformanceMetrics

**Validation Rules**:
- Name must be unique within framework
- Execution time must be non-negative
- Completed timestamp must be after started timestamp
- Environment must be one of the defined values

**State Transitions**:
- PENDING → RUNNING (pipeline starts)
- RUNNING → SUCCESS (pipeline completes successfully)
- RUNNING → FAILED (pipeline fails)
- RUNNING → CANCELLED (pipeline cancelled)

### PerformanceMetrics
**Purpose**: Data collection system tracking automation execution times, success rates, and system performance

**Attributes**:
- `id`: Unique identifier (UUID)
- `entity_type`: Type of entity being measured (enum: FRAMEWORK, TEST_SUITE, PIPELINE)
- `entity_id`: Reference to the measured entity (UUID, foreign key)
- `metric_type`: Type of metric (enum: EXECUTION_TIME, SUCCESS_RATE, MEMORY_USAGE, CPU_USAGE, THROUGHPUT)
- `value`: Metric value (decimal)
- `unit`: Unit of measurement (string)
- `timestamp`: Measurement timestamp
- `context`: Additional context data (JSON object)
- `threshold`: Performance threshold (decimal, optional)
- `status`: Threshold status (enum: PASS, WARN, FAIL, optional)

**Relationships**:
- Polymorphic relationship with AutomationFramework, TestSuite, and BuildPipeline

**Validation Rules**:
- Value must be non-negative
- Timestamp must be valid
- Unit must be non-empty string
- Threshold status must be one of the defined values

**State Transitions**:
- Metrics are immutable once created
- Threshold status can be updated based on new thresholds

### GameEngineIntegration
**Purpose**: Interface layer connecting automation tools with Unreal Engine 4/5

**Attributes**:
- `id`: Unique identifier (UUID)
- `name`: Integration name (string, required)
- `engine_version`: Unreal Engine version (string)
- `integration_type`: Type of integration (enum: GAUNTLET, BUILDGRAPH, HORDE, UGS)
- `framework_id`: Reference to AutomationFramework (UUID, foreign key)
- `status`: Connection status (enum: CONNECTED, DISCONNECTED, ERROR)
- `configuration`: Integration configuration (JSON object)
- `capabilities`: Supported capabilities (array of strings)
- `last_heartbeat`: Last heartbeat timestamp
- `error_count`: Number of connection errors (integer)
- `performance_data`: Performance data (JSON object)

**Relationships**:
- Many-to-One with AutomationFramework

**Validation Rules**:
- Name must be unique within framework
- Engine version must be valid UE version
- Error count must be non-negative
- Configuration must be valid JSON

**State Transitions**:
- DISCONNECTED → CONNECTED (successful connection)
- CONNECTED → DISCONNECTED (connection lost)
- CONNECTED → ERROR (connection error)
- ERROR → CONNECTED (error resolved)

## Data Relationships

### Entity Relationship Diagram
```
AutomationFramework (1) ←→ (N) TestSuite
AutomationFramework (1) ←→ (N) BuildPipeline
AutomationFramework (1) ←→ (N) GameEngineIntegration
TestSuite (1) ←→ (N) PerformanceMetrics
BuildPipeline (1) ←→ (N) PerformanceMetrics
GameEngineIntegration (1) ←→ (N) PerformanceMetrics
```

### Key Relationships
1. **Framework-Centric**: All entities are organized around the AutomationFramework
2. **Metrics Collection**: PerformanceMetrics can be associated with any entity
3. **Hierarchical Structure**: Clear parent-child relationships for organization
4. **Temporal Data**: All entities include timestamp tracking for audit trails

## Data Validation Rules

### Global Rules
- All UUIDs must be valid UUID v4 format
- All timestamps must be in ISO 8601 format
- All JSON fields must be valid JSON
- All enum values must be from predefined lists
- All required fields must be non-null

### Business Rules
- Test suites cannot be deleted if they have active performance metrics
- Build pipelines cannot be modified while running
- Game engine integrations must have valid engine versions
- Performance metrics older than 1 year can be archived
- Framework configuration changes require validation

## Data Access Patterns

### Read Patterns
- **Framework Overview**: Get framework with summary metrics
- **Test Execution**: Get test suite with recent execution data
- **Pipeline Status**: Get pipeline with current status and progress
- **Performance Analysis**: Get metrics for specific time ranges

### Write Patterns
- **Test Execution**: Create performance metrics for test runs
- **Pipeline Updates**: Update pipeline status and progress
- **Configuration Changes**: Update framework and integration configurations
- **Error Logging**: Create error records for failed operations

## Data Storage Strategy

### Primary Storage
- **Database**: MySQL for structured data and relationships
- **File System**: For large artifacts and logs
- **Cache**: Redis for frequently accessed data

### Data Retention
- **Performance Metrics**: 1 year retention with monthly archiving
- **Test Results**: 6 months retention with weekly archiving
- **Build Artifacts**: 3 months retention with daily cleanup
- **Configuration History**: 2 years retention for audit purposes

---

**Status**: Data model complete - Ready for implementation  
**Next Phase**: API contract generation  
**Validation**: All entities support the functional requirements
