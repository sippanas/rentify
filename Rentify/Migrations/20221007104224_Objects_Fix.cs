using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rentify.Migrations
{
    public partial class Objects_Fix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Objects_ObjectTypes_ObjectTypeId",
                table: "Objects");

            migrationBuilder.AlterColumn<int>(
                name: "ObjectTypeId",
                table: "Objects",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Objects_ObjectTypes_ObjectTypeId",
                table: "Objects",
                column: "ObjectTypeId",
                principalTable: "ObjectTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Objects_ObjectTypes_ObjectTypeId",
                table: "Objects");

            migrationBuilder.AlterColumn<int>(
                name: "ObjectTypeId",
                table: "Objects",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Objects_ObjectTypes_ObjectTypeId",
                table: "Objects",
                column: "ObjectTypeId",
                principalTable: "ObjectTypes",
                principalColumn: "Id");
        }
    }
}
