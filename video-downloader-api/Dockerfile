# Stage 1: Build the Java application
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml .
# Download dependencies first to cache this layer
RUN mvn dependency:go-offline -B
COPY src src
# Build the JAR file
RUN mvn package -DskipTests

# Stage 2: Setup the Runtime environment
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Install required dependencies: ffmpeg and python
RUN apk add --no-cache ffmpeg python3 py3-pip

# Install yt-dlp nightly using pip
RUN pip install -U https://github.com/yt-dlp/yt-dlp/archive/master.tar.gz --break-system-packages

# Copy the built jar from the previous stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
