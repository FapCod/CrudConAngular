use DBCrudAngular

create table Empleado(
IdEmpleado int primary key identity,
NombreCompleto varchar(250),
Correo varchar(250),
Sueldo decimal(20,2),
FechaContrato date
)
INSERT INTO Empleado (NombreCompleto, Correo, Sueldo, FechaContrato)
VALUES ('Juan Pérez', 'juan.perez@empresa.com', 3500.00, '2023-02-15');

INSERT INTO Empleado (NombreCompleto, Correo, Sueldo, FechaContrato)
VALUES ('María López', 'maria.lopez@empresa.com', 4200.50, '2022-08-10');

INSERT INTO Empleado (NombreCompleto, Correo, Sueldo, FechaContrato)
VALUES ('Carlos Ramírez', 'carlos.ramirez@empresa.com', 3100.75, '2023-01-25');

INSERT INTO Empleado (NombreCompleto, Correo, Sueldo, FechaContrato)
VALUES ('Ana Torres', 'ana.torres@empresa.com', 3900.00, '2021-11-05');

INSERT INTO Empleado (NombreCompleto, Correo, Sueldo, FechaContrato)
VALUES ('Luis Fernández', 'luis.fernandez@empresa.com', 2750.25, '2020-04-18');


select * from Empleado

CREATE PROCEDURE sp_InsertarEmpleado
    @NombreCompleto varchar(250),
    @Correo varchar(250),
    @Sueldo decimal(20,2),
    @FechaContrato date
AS
BEGIN
    INSERT INTO Empleado (NombreCompleto, Correo, Sueldo, FechaContrato)
    VALUES (@NombreCompleto, @Correo, @Sueldo, @FechaContrato);
END;

CREATE PROCEDURE sp_ObtenerEmpleados
AS
BEGIN
    SELECT IdEmpleado, NombreCompleto, Correo, Sueldo, FechaContrato
    FROM Empleado;
END;

CREATE PROCEDURE sp_ObtenerEmpleadoPorId
    @IdEmpleado int
AS
BEGIN
    SELECT IdEmpleado, NombreCompleto, Correo, Sueldo, FechaContrato
    FROM Empleado
    WHERE IdEmpleado = @IdEmpleado;
END;


CREATE PROCEDURE sp_ActualizarEmpleado
    @IdEmpleado int,
    @NombreCompleto varchar(250),
    @Correo varchar(250),
    @Sueldo decimal(20,2),
    @FechaContrato date
AS
BEGIN
    UPDATE Empleado
    SET NombreCompleto = @NombreCompleto,
        Correo = @Correo,
        Sueldo = @Sueldo,
        FechaContrato = @FechaContrato
    WHERE IdEmpleado = @IdEmpleado;
END;


CREATE PROCEDURE sp_EliminarEmpleado
    @IdEmpleado int
AS
BEGIN
    DELETE FROM Empleado
    WHERE IdEmpleado = @IdEmpleado;
END;
