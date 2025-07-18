using Microsoft.EntityFrameworkCore;
using RentSaaSTask_AAM.Server.Models;

namespace RentSaaSTask_AAM.Server.Data
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options) { }

        public DbSet<Employee> Employees { get; set; }
    }
} 