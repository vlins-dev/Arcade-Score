using Backend.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Adicionar suporte aos Controllers
builder.Services.AddControllers();

// 2. Registrar o ScoreService como Singleton para manter os dados em memória
builder.Services.AddSingleton<ScoreService>();

// 3. Configurar política de CORS para permitir comunicação do Angular
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // URL padrão do servidor dev do Angular
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Adicionar Swagger/OpenAPI para testar a API facilmente pelo navegador
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configurar o pipeline de requisições HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Habilitar a política de CORS configurada acima
app.UseCors("AllowAngularDev");

app.UseAuthorization();

app.MapControllers();

app.Run();