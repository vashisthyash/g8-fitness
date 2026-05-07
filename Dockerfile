# Step 1: Build the app using Maven
FROM maven:3.8.4-openjdk-17 AS build
COPY . .
# We use 'mvn' instead of './mvnw' to avoid permission issues on Render
RUN mvn clean package -DskipTests

# Step 2: Run the app using Java
FROM openjdk:17-jdk-slim
COPY --from=build /target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]