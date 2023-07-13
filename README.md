# Welcome to the Offer API!

That's an Offer API designed to create and interact with users' crypto offers. This API allows you to manage various offers related to cryptocurrencies and provide a seamless experience for users. Follow the instructions below to get started with running the project.

## Setup Instructions

1. Clone the repository:

   ```shell
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```shell
   cd <project_directory>
   ```

3. Install dependencies:

   ```shell
   npm install
   ```

4. Set up the environment file:
   - Rename the `.env.example` file to `.env`.
   - Open the `.env` file and update the values according to your configuration.

5. Start the project using Docker Compose:

   ```shell
   docker-compose up
   ```

   This command will build the necessary containers and start the API.

6. You're all set! The Offer API is now up and running. You can access it via `http://localhost:3000`

## API Endpoints

Once the project is running, you can use the following url to access Swagger documentation `http://localhost:3000/api`