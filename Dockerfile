# St# Step 1: Build
    #FROM maven:3.8.4-openjdk-17 AS build
    #COPY . .
    #RUN mvn clean package -DskipTests
    #
    ## Step 2: Run (Updated to the new official image)
    #FROM eclipse-temurin:17-jdk-jammy
    #COPY --from=build /target/*.jar app.jar
    #EXPOSE 8080
    #ENTRYPOINT ["java","-jar","/app.jar"]