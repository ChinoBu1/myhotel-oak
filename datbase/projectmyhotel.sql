-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-12-2022 a las 18:47:36
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `projectmyhotel`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `DNIcliente` varchar(9) NOT NULL,
  `Nombre` char(25) NOT NULL,
  `Apellidos` char(25) NOT NULL,
  `Email` text NOT NULL,
  `Telefono` int(9) NOT NULL,
  `Rol` enum('hotelero','cliente') NOT NULL,
  `Direccion` varchar(50) NOT NULL,
  `Fecha_de_nacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fecha_reserva`
--

CREATE TABLE `fecha_reserva` (
  `CodigoReserva` varchar(10) NOT NULL,
  `FechaEntrada` date NOT NULL,
  `FechaSalida` date NOT NULL,
  `DNIcliente` varchar(9) NOT NULL,
  `idhabitacion` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitacion`
--

CREATE TABLE `habitacion` (
  `idhabitacion` int(3) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `idhotel` int(10) NOT NULL,
  `NumeroHabitacion` int(3) NOT NULL,
  `Capacidad` int(3) NOT NULL,
  `Categoria` enum('individual','doble estandar','triple estandar','suite') NOT NULL
  `Precio` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hostelero`
--

CREATE TABLE `hostelero` (
  `NIFhostelero` varchar(9) NOT NULL,
  `Nombre` char(25) NOT NULL,
  `Apellidos` char(25) NOT NULL,
  `Email` text NOT NULL,
  `Telefono` int(9) NOT NULL,
  `Rol` enum('hotelero','cliente') NOT NULL,
  `CuentaBanco` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotel`
--

CREATE TABLE `hotel` (
  `idHotel` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `NombreHotel` char(25) NOT NULL,
  `TelefonoHotel` int(9) NOT NULL,
  `Direccion` varchar(50) NOT NULL,
  `Estrellas` enum('1','2','3','4','5') NOT NULL,
  `Regimen` enum('todo incluido','media pension','desayuno','solo alojamiento') NOT NULL,
  `WiFi` tinyint(1) NOT NULL,
  `Parking` tinyint(1) NOT NULL,
  `Piscina` tinyint(1) NOT NULL,
  `CodigoPostal` int(5) NOT NULL,
  `Administrador`varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `DNI` varchar(9) NOT NULL,
  `Nombre` char(25) NOT NULL,
  `Apellidos` char(25) NOT NULL,
  `Email` text NOT NULL,
  `Pasword` varchar(15) NOT NULL,
  `Telefono` int(9) NOT NULL,
  `Rol` enum('hotelero','cliente') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicacion`
--

CREATE TABLE `ubicacion` (
  `NombreCiudad` char(25) NOT NULL,
  `CodigoPostal` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoracion`
--

CREATE TABLE `valoracion` (
  `idvaloracion` int(5) NOT NULL,
  `DNIcliente` varchar(9) NOT NULL,
  `idhotel` int(10) NOT NULL,
  `Puntuacion` enum('0','1','2','3','4','5','6','7','8','9','10') NOT NULL,
  `Descripcion` char(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`DNIcliente`);

--
-- Indices de la tabla `fecha_reserva`
--
ALTER TABLE `fecha_reserva`
  ADD PRIMARY KEY (`CodigoReserva`),
  ADD KEY `DNIcliente` (`DNIcliente`),
  ADD KEY `idhabitacion` (`idhabitacion`);

--
-- Indices de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD KEY `idhotel` (`idhotel`);

--
-- Indices de la tabla `hostelero`
--
ALTER TABLE `hostelero`
  ADD PRIMARY KEY (`NIFhostelero`);

--
-- Indices de la tabla `hotel`
--
ALTER TABLE `hotel`
  ADD KEY `CodigoPostal` (`CodigoPostal`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`DNI`);

--
-- Indices de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  ADD PRIMARY KEY (`CodigoPostal`);

--
-- Indices de la tabla `valoracion`
--
ALTER TABLE `valoracion`
  ADD PRIMARY KEY (`idvaloracion`),
  ADD KEY `DNIcliente` (`DNIcliente`),
  ADD KEY `idhotel` (`idhotel`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`DNIcliente`) REFERENCES `persona` (`DNI`);

--
-- Filtros para la tabla `fecha_reserva`
--
ALTER TABLE `fecha_reserva`
  ADD CONSTRAINT `fecha_reserva_ibfk_1` FOREIGN KEY (`DNIcliente`) REFERENCES `cliente` (`DNIcliente`),
  ADD CONSTRAINT `fecha_reserva_ibfk_2` FOREIGN KEY (`idhabitacion`) REFERENCES `habitacion` (`idhabitacion`);

--
-- Filtros para la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD CONSTRAINT `habitacion_ibfk_1` FOREIGN KEY (`idhotel`) REFERENCES `hotel` (`idHotel`),
  ADD CONSTRAINT `habitacion_ibfk_2` FOREIGN KEY (`idhotel`) REFERENCES `hotel` (`idHotel`);

--
-- Filtros para la tabla `hostelero`
--
ALTER TABLE `hostelero`
  ADD CONSTRAINT `hostelero_ibfk_1` FOREIGN KEY (`NIFhostelero`) REFERENCES `persona` (`DNI`),
  ADD CONSTRAINT `hostelero_ibfk_2` FOREIGN KEY (`NIFhostelero`) REFERENCES `persona` (`DNI`);

--
-- Filtros para la tabla `hotel`
--
ALTER TABLE `hotel`
  ADD CONSTRAINT `hotel_ibfk_1` FOREIGN KEY (`Administrador`) REFERENCES `hostelero` (`NIFhostelero`),
  ADD CONSTRAINT `hotel_ibfk_2` FOREIGN KEY (`CodigoPostal`) REFERENCES `ubicacion` (`CodigoPostal`);

--
-- Filtros para la tabla `valoracion`
--
ALTER TABLE `valoracion`
  ADD CONSTRAINT `valoracion_ibfk_1` FOREIGN KEY (`DNIcliente`) REFERENCES `cliente` (`DNIcliente`),
  ADD CONSTRAINT `valoracion_ibfk_2` FOREIGN KEY (`idhotel`) REFERENCES `hotel` (`idHotel`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
