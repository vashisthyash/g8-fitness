FROM maven:3.8.4-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-jammy
COPY --from=build /target/*.jar app.jar

# These lines link Render's settings to your Java app
ENV SPRING_DATASOURCE_URL=${SPRING_DATASOURCE_URL}
ENV SPRING_DATASOURCE_USERNAME=${SPRING_DATASOURCE_USERNAME}
ENV SPRING_DATASOURCE_PASSWORD=${SPRING_DATASOURCE_PASSWORD}git add .
                                                            git commit -m "Linking environment variables in Docker"
                                                            git push origin main

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]