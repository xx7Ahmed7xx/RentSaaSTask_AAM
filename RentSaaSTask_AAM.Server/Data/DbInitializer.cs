using Microsoft.EntityFrameworkCore;
using RentSaaSTask_AAM.Server.Models;

namespace RentSaaSTask_AAM.Server.Data
{
    public static class DbInitializer
    {
        public static void Initialize(EmployeeDbContext context)
        {
            // Ensure database is created
            context.Database.EnsureCreated();

            // Check if there are any employees
            if (context.Employees.Any())
            {
                return; // Database has been seeded
            }

            // Add sample employees
            var employees = new Employee[]
            {
                new Employee { FirstName = "John", LastName = "Doe", Email = "john.doe@company.com", Position = "Software Engineer" },
                new Employee { FirstName = "Jane", LastName = "Smith", Email = "jane.smith@company.com", Position = "Product Manager" },
                new Employee { FirstName = "Mike", LastName = "Johnson", Email = "mike.johnson@company.com", Position = "UI/UX Designer" },
                new Employee { FirstName = "Sarah", LastName = "Williams", Email = "sarah.williams@company.com", Position = "QA Engineer" },
                new Employee { FirstName = "David", LastName = "Brown", Email = "david.brown@company.com", Position = "DevOps Engineer" },
                new Employee { FirstName = "Lisa", LastName = "Davis", Email = "lisa.davis@company.com", Position = "Business Analyst" },
                new Employee { FirstName = "Tom", LastName = "Wilson", Email = "tom.wilson@company.com", Position = "Data Scientist" },
                new Employee { FirstName = "Emily", LastName = "Taylor", Email = "emily.taylor@company.com", Position = "Frontend Developer" },
                new Employee { FirstName = "Chris", LastName = "Anderson", Email = "chris.anderson@company.com", Position = "Backend Developer" },
                new Employee { FirstName = "Amanda", LastName = "Thomas", Email = "amanda.thomas@company.com", Position = "Project Manager" }
            };

            context.Employees.AddRange(employees);
            context.SaveChanges();
        }
    }
} 