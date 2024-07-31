using System.Net.Http.Json;
using FluentAssertions;
using MicroClientes.Domain.Entities;

namespace Integration.Tests
{
    public  class ClientesControllerTest
    {
        [Fact]
        public async Task JoinMatchRequest_AddsPlayerToMatch()
        {
            // Arrange
            var application = new MicroservicesWebApplicationFactory();
             

            var client = application.CreateClient();

            // Act
            var response = await client.GetAsync ("/api/Clientes/GetById/1");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299

            var matchResponse = await response.Content.ReadFromJsonAsync<Cliente>();
            matchResponse?.id.Should().BePositive();
            //matchResponse?.Player1.Should().Be("P1");
            //matchResponse?.State.Should().Be(nameof(GameMatchState.WaitingForOpponent));
        }
    }
}
