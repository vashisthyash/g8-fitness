# Use Java 17
FROM eclipse-temurin:17-jdk-jammy as build
COPY . .
# Build the application
RUN ./mvnw clean package -DskipTests

# Run the application
FROM eclipse-temurin:17-jre-jammy
COPY --from=build /target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]