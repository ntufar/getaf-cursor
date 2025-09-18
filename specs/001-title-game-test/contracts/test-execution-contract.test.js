/**
 * Contract Tests for Test Execution API
 * These tests validate the API contract without implementation
 * Tests must fail initially - they will pass once implementation is complete
 */

const { expect } = require('chai');
const request = require('supertest');

describe('Test Execution API Contract', () => {
  const baseUrl = process.env.API_BASE_URL || 'http://localhost:8080/v1';
  const api = request(baseUrl);

  describe('POST /tests/execute', () => {
    it('should accept valid test execution request', async () => {
      const validRequest = {
        suiteId: '550e8400-e29b-41d4-a716-446655440000',
        configuration: {
          parallel: true,
          timeout: 300,
          environment: 'DEV',
          dataSources: ['test-data-1', 'test-data-2']
        }
      };

      const response = await api
        .post('/tests/execute')
        .send(validRequest)
        .expect(202);

      // Validate response schema
      expect(response.body).to.have.property('executionId');
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('message');
      expect(response.body).to.have.property('estimatedDuration');

      // Validate data types
      expect(response.body.executionId).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
      expect(response.body.status).to.be.oneOf(['PENDING', 'RUNNING', 'COMPLETED', 'FAILED']);
      expect(response.body.message).to.be.a('string');
      expect(response.body.estimatedDuration).to.be.a('number');
    });

    it('should reject request with missing suiteId', async () => {
      const invalidRequest = {
        configuration: {
          parallel: true,
          timeout: 300
        }
      };

      await api
        .post('/tests/execute')
        .send(invalidRequest)
        .expect(400);
    });

    it('should reject request with invalid environment', async () => {
      const invalidRequest = {
        suiteId: '550e8400-e29b-41d4-a716-446655440000',
        configuration: {
          environment: 'INVALID_ENVIRONMENT'
        }
      };

      await api
        .post('/tests/execute')
        .send(invalidRequest)
        .expect(400);
    });

    it('should reject request with invalid UUID format', async () => {
      const invalidRequest = {
        suiteId: 'invalid-uuid',
        configuration: {
          parallel: true
        }
      };

      await api
        .post('/tests/execute')
        .send(invalidRequest)
        .expect(400);
    });
  });

  describe('GET /tests/{testId}/status', () => {
    it('should return test status for valid test ID', async () => {
      const testId = '550e8400-e29b-41d4-a716-446655440000';

      const response = await api
        .get(`/tests/${testId}/status`)
        .expect(200);

      // Validate response schema
      expect(response.body).to.have.property('executionId');
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('progress');
      expect(response.body).to.have.property('results');
      expect(response.body).to.have.property('executionTime');
      expect(response.body).to.have.property('startedAt');

      // Validate data types
      expect(response.body.executionId).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
      expect(response.body.status).to.be.oneOf(['PENDING', 'RUNNING', 'COMPLETED', 'FAILED']);
      expect(response.body.progress).to.be.a('number');
      expect(response.body.progress).to.be.at.least(0);
      expect(response.body.progress).to.be.at.most(100);
      expect(response.body.results).to.be.an('object');
      expect(response.body.results).to.have.property('totalTests');
      expect(response.body.results).to.have.property('passedTests');
      expect(response.body.results).to.have.property('failedTests');
      expect(response.body.results).to.have.property('skippedTests');
      expect(response.body.executionTime).to.be.a('number');
      expect(response.body.startedAt).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/);
    });

    it('should return 404 for non-existent test ID', async () => {
      const nonExistentTestId = '00000000-0000-0000-0000-000000000000';

      await api
        .get(`/tests/${nonExistentTestId}/status`)
        .expect(404);
    });

    it('should return 400 for invalid UUID format', async () => {
      const invalidTestId = 'invalid-uuid';

      await api
        .get(`/tests/${invalidTestId}/status`)
        .expect(400);
    });
  });

  describe('Error Response Format', () => {
    it('should return consistent error response format', async () => {
      const invalidRequest = {
        suiteId: 'invalid-uuid'
      };

      const response = await api
        .post('/tests/execute')
        .send(invalidRequest)
        .expect(400);

      // Validate error response schema
      expect(response.body).to.have.property('error');
      expect(response.body).to.have.property('timestamp');
      expect(response.body).to.have.property('requestId');

      expect(response.body.error).to.have.property('code');
      expect(response.body.error).to.have.property('message');
      expect(response.body.error).to.have.property('details');

      // Validate data types
      expect(response.body.error.code).to.be.a('string');
      expect(response.body.error.message).to.be.a('string');
      expect(response.body.error.details).to.be.an('object');
      expect(response.body.timestamp).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/);
      expect(response.body.requestId).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });
  });
});
