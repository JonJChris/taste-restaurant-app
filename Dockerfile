FROM openjdk:17
COPY target/TasteRestaurant-1.0.jar TasteRestaurant-1.0.jar
ENTRYPOINT ["java", "-jar", "/TasteRestaurant-1.0.jar"]