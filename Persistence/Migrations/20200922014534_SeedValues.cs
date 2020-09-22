using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class SeedValues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Data" },
                values: new object[] { 1, "My Data 1" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Data" },
                values: new object[] { 2, "My Data 2" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Data" },
                values: new object[] { 3, "My Data 3" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
