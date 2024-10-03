#!/bin/bash

# Start the frontend
cd frontend && npm run dev &

# Start the backend
cd ../backend && npm run dev
