using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MicroClientes.Controllers;
using MicroClientes.Application.Service;
using MicroClientes.Domain.Entities;

namespace MicroClientes.Tests;

public class ClientesControllerTest
{
    private readonly ClientesController _controller;
    private readonly Mock<ClienteService> _mockClienteService;

    public ClientesControllerTest(ClientesController controller, Mock<ClienteService> mockClienteService)
    {
        _controller = controller;
        _mockClienteService = mockClienteService;
    }

    [Fact]
    public async Task GetAll_ReturnsOkResult_WithListOfEntities()
    {
        var entities = new List<Cliente>
        {
            new Cliente { id = 1, password = "Entity1" , estado=true},
            new Cliente { id = 2, password = "Entity2" , estado=true}
        };
        _mockClienteService.Setup(service => service.ListEntity()).ReturnsAsync(entities);

        var result = await _controller.GetAll();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnValue = Assert.IsType<List<Cliente>>(okResult.Value);
        Assert.Equal(entities.Count, returnValue.Count);
    }

    [Fact]
    public async Task GetAll_ReturnsInternalServerError_OnException()
    {
        _mockClienteService.Setup(service => service.ListEntity()).ThrowsAsync(new Exception("Test exception"));

        var result = await _controller.GetAll();

        var statusCodeResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(StatusCodes.Status500InternalServerError, statusCodeResult.StatusCode);
    }
}