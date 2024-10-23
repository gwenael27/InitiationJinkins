const request = require('supertest');
const express = require('express');
const app = require('../app'); // On va modifier app.js pour l'exporter

describe('Tests API Express', () => {
    it('GET / devrait retourner "Hello World"', async () => {
        const response = await request(app)
            .get('/')
            .expect('Content-Type', /text/)
            .expect(200);
            
        expect(response.text).toBe('Hello World');
    });

    it('Route inexistante devrait retourner 404', async () => {
        const response = await request(app)
            .get('/route-inexistante')
            .expect(404);
    });
});