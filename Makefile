# Makefile

FRONTEND_DIR=frontend
BACKEND_DIR=backend

FRONTEND_START_CMD=cd $(FRONTEND_DIR) && npm install && npm start
BACKEND_START_CMD=cd $(BACKEND_DIR) && npm install && npm start

start:
	concurrently "$(FRONTEND_START_CMD)" "$(BACKEND_START_CMD)"

clean:
	rm -rf $(FRONTEND_DIR)/node_modules
	rm -rf $(FRONTEND_DIR)/build
	rm -rf $(BACKEND_DIR)/node_modules

restart: clean install start
