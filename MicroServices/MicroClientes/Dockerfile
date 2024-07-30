# Use the official .NET 8 SDK image as the build environment
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the csproj file and restore dependencies
COPY MicroClientes/*.csproj ./MicroClientes/
RUN dotnet restore MicroClientes/MicroClientes.csproj

# Copy the rest of the application and build it
COPY MicroClientes/. ./MicroClientes/
WORKDIR /app/MicroClientes
RUN dotnet build -c Release -o /app/build

# Publish the application
RUN dotnet publish -c Release -o /app/publish

# Use the official .NET 8 runtime image for the runtime environment
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Expose port 80
EXPOSE 80

# Set the entry point to the application
ENTRYPOINT ["dotnet", "MicroClientes.dll"]
