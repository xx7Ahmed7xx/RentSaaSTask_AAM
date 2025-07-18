using Microsoft.EntityFrameworkCore;
using RentSaaSTask_AAM.Server.Data;
using Microsoft.Extensions.DependencyInjection;

namespace RentSaaSTask_AAM.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularDev",
                    policy => policy.WithOrigins("https://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
            });

            builder.Services.AddControllers();
            // Register EmployeeDbContext with SQLite
            builder.Services.AddDbContext<EmployeeDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("EmployeeDb")));
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowAngularDev");

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            // Initialize database with sample data
            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<EmployeeDbContext>();
                DbInitializer.Initialize(context);
            }

            app.Run();
        }
    }
}
