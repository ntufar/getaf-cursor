# Quickstart Guide: Game Test Automation Practice Project

**Date**: 2025-01-27  
**Branch**: `001-title-game-test`  
**Purpose**: Validate the complete automation framework through end-to-end scenarios

## Prerequisites

### System Requirements
- **OS**: Windows 10/11 or Linux (Ubuntu 20.04+)
- **Memory**: 8GB RAM minimum, 16GB recommended
- **Storage**: 50GB free space for Unreal Engine and dependencies
- **Network**: Internet connection for dependency downloads

### Software Dependencies
- **Unreal Engine**: 5.3+ (with Gauntlet framework)
- **Visual Studio**: 2022 Community or Professional
- **VS Code**: Latest version with C++, C#, Python extensions
- **Node.js**: 18+ for API testing
- **Python**: 3.9+ for automation scripts
- **MySQL**: 8.0+ for data storage
- **Git**: Latest version for version control

### Development Tools
- **Test Runners**: MSTest, NUnit, Catch2, GoogleTest, Pytest
- **API Testing**: Postman or curl
- **Database**: MySQL Workbench or command line client
- **Build Tools**: CMake, MSBuild, or equivalent

## Installation Steps

### 1. Clone Repository
```bash
git clone https://github.com/your-org/game-test-automation.git
cd game-test-automation
git checkout 001-title-game-test
```

### 2. Install Dependencies
```bash
# Install Node.js dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt

# Install C++ dependencies (Windows)
# Run Visual Studio Installer and install C++ development tools

# Install C# dependencies
dotnet restore
```

### 3. Database Setup
```sql
-- Create database
CREATE DATABASE game_automation;

-- Create user
CREATE USER 'automation_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON game_automation.* TO 'automation_user'@'localhost';
FLUSH PRIVILEGES;

-- Run database migrations
mysql -u automation_user -p game_automation < database/schema.sql
```

### 4. Configuration
```bash
# Copy configuration template
cp config/config.template.json config/config.json

# Edit configuration with your settings
# - Database connection details
# - Unreal Engine paths
# - API endpoints
# - Performance thresholds
```

## Quickstart Scenarios

### Scenario 1: C++ Automation Engine Validation
**Objective**: Demonstrate excellent C++ proficiency for core automation engines

**Steps**:
1. **Start the automation framework**:
   ```bash
   ./scripts/start-framework.sh
   ```

2. **Execute C++ unit tests**:
   ```bash
   cd src/core
   mkdir build && cd build
   cmake ..
   make
   ./tests/unit/core_tests
   ```

3. **Run C++ integration tests**:
   ```bash
   ./tests/integration/engine_integration_tests
   ```

4. **Validate performance metrics**:
   ```bash
   # Check execution time < 5 minutes
   time ./tests/performance/engine_performance_tests
   ```

**Expected Results**:
- All C++ tests pass with 100% success rate
- Execution time under 5 minutes
- Memory usage under 2GB
- No memory leaks detected

### Scenario 2: C# Windows Integration Testing
**Objective**: Use C# effectively for Windows-specific automation and .NET integration

**Steps**:
1. **Build C# components**:
   ```bash
   cd src/windows
   dotnet build
   ```

2. **Execute C# tests**:
   ```bash
   dotnet test --logger "console;verbosity=detailed"
   ```

3. **Run Windows UI automation**:
   ```bash
   dotnet run --project src/windows/drivers/UI.Automation
   ```

4. **Validate .NET integration**:
   ```bash
   dotnet run --project src/windows/services/Windows.Services
   ```

**Expected Results**:
- All C# tests pass
- Windows UI automation works correctly
- .NET services integrate properly
- Performance meets requirements

### Scenario 3: CI/CD Pipeline Integration
**Objective**: Integrate seamlessly with build systems and provide automated testing and reporting

**Steps**:
1. **Trigger build pipeline**:
   ```bash
   curl -X POST http://localhost:8080/v1/builds/trigger \
     -H "Content-Type: application/json" \
     -d '{
       "pipelineId": "550e8400-e29b-41d4-a716-446655440000",
       "configuration": {
         "environment": "DEV",
         "triggerType": "MANUAL"
       }
     }'
   ```

2. **Monitor build progress**:
   ```bash
   # Get build status
   curl http://localhost:8080/v1/builds/{buildId}/status
   ```

3. **Validate automated testing**:
   ```bash
   # Check test execution
   curl http://localhost:8080/v1/tests/{testId}/status
   ```

4. **Review automated reporting**:
   ```bash
   # Generate metrics report
   curl -X POST http://localhost:8080/v1/metrics/report \
     -H "Content-Type: application/json" \
     -d '{
       "entityType": "PIPELINE",
       "startDate": "2025-01-01T00:00:00Z",
       "endDate": "2025-01-31T23:59:59Z",
       "format": "JSON"
     }'
   ```

**Expected Results**:
- Build pipeline completes successfully
- Automated testing runs without errors
- Reports are generated automatically
- Integration time under 30 minutes

### Scenario 4: Graphics Testing Scenarios
**Objective**: Handle both 2D and 3D graphics testing scenarios for game development

**Steps**:
1. **Start Unreal Engine**:
   ```bash
   ./scripts/start-unreal-engine.sh
   ```

2. **Execute 2D graphics tests**:
   ```bash
   ./tests/graphics/2d_graphics_tests --engine-version=5.3
   ```

3. **Execute 3D graphics tests**:
   ```bash
   ./tests/graphics/3d_graphics_tests --engine-version=5.3
   ```

4. **Validate graphics performance**:
   ```bash
   ./tests/performance/graphics_performance_tests
   ```

**Expected Results**:
- 2D graphics tests pass
- 3D graphics tests pass
- Graphics performance meets requirements
- No rendering errors

### Scenario 5: API Functionality Validation
**Objective**: Provide REST APIs with comprehensive HTTP protocol implementation

**Steps**:
1. **Start API server**:
   ```bash
   cd src/api
   npm start
   ```

2. **Test API endpoints**:
   ```bash
   # Test health endpoint
   curl http://localhost:8080/v1/performance/health
   
   # Test metrics endpoint
   curl "http://localhost:8080/v1/metrics?entityType=FRAMEWORK&startDate=2025-01-01T00:00:00Z&endDate=2025-01-31T23:59:59Z"
   ```

3. **Validate API contracts**:
   ```bash
   npm run test:contracts
   ```

4. **Test API performance**:
   ```bash
   # Response time should be < 200ms
   time curl http://localhost:8080/v1/performance/health
   ```

**Expected Results**:
- All API endpoints respond correctly
- Contract tests pass
- API response time under 200ms
- HTTP protocol implementation is comprehensive

## Validation Checklist

### Functional Requirements Validation
- [ ] **FR-001**: C++ proficiency demonstrated through core automation engine
- [ ] **FR-002**: C# capabilities shown through Windows integration
- [ ] **FR-003**: CI/CD integration working seamlessly
- [ ] **FR-004**: 2D and 3D graphics testing scenarios handled
- [ ] **FR-005**: REST APIs with HTTP protocol implementation
- [ ] **FR-006**: Multiple API platforms (Postman, curl) supported
- [ ] **FR-007**: Unreal Engine 4/5 automation frameworks proficiency
- [ ] **FR-008**: BuildGraph workflows and Horde build systems support
- [ ] **FR-009**: Version control systems (GitHub) integration
- [ ] **FR-010**: Comprehensive test automation metrics tracking
- [ ] **FR-011**: Multiple test runners support
- [ ] **FR-012**: Test Automation Framework structure understanding
- [ ] **FR-013**: Data-Driven Development approaches implementation
- [ ] **FR-014**: MySQL database operations support
- [ ] **FR-015**: Clean, maintainable, and well-documented code
- [ ] **FR-016**: Complex technical blockers resolution ability
- [ ] **FR-017**: C++ and C# debugging in Unreal Engine context
- [ ] **FR-018**: Adequate performance metrics for nightly builds
- [ ] **FR-019**: Excellent communication and collaboration capabilities
- [ ] **FR-020**: Independent work ability in fast-moving environments
- [ ] **FR-021**: Epic Games tools integration (Fortnite, Unity Test Harness, UGS)
- [ ] **FR-022**: Performance targets met (unit <5min, integration <30min, nightly <2hr)
- [ ] **FR-023**: Game engine failure handling with retry mechanisms

### Performance Validation
- [ ] Unit tests execute in under 5 minutes
- [ ] Integration tests execute in under 30 minutes
- [ ] Nightly builds complete in under 2 hours
- [ ] API responses under 200ms
- [ ] Memory usage under 4GB per instance
- [ ] Support for 10+ concurrent test instances

### Error Handling Validation
- [ ] Automatic retry mechanisms (3 attempts) work correctly
- [ ] Graceful degradation for non-critical tests
- [ ] Comprehensive error logging with stack traces
- [ ] Game engine failure recovery scenarios

## Troubleshooting

### Common Issues

**Issue**: Unreal Engine not starting
**Solution**: 
- Verify UE5.3+ installation
- Check Gauntlet framework availability
- Ensure proper environment variables

**Issue**: Database connection failed
**Solution**:
- Verify MySQL service is running
- Check connection credentials in config.json
- Ensure database schema is created

**Issue**: API tests failing
**Solution**:
- Verify API server is running on port 8080
- Check API contract specifications
- Ensure proper authentication tokens

**Issue**: Performance tests exceeding time limits
**Solution**:
- Check system resources (CPU, memory)
- Verify test data size and complexity
- Review performance optimization settings

### Support Resources
- **Documentation**: `/docs` directory
- **API Reference**: `/docs/api` directory
- **Architecture Guide**: `/docs/architecture` directory
- **User Guides**: `/docs/user-guides` directory

---

**Status**: Quickstart complete - Framework ready for development  
**Next Phase**: Task execution and implementation  
**Validation**: All scenarios demonstrate required competencies
