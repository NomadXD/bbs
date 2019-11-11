-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 11, 2019 at 11:18 PM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `BloodGroup`
--

CREATE TABLE `BloodGroup` (
  `blood_group_id` int(11) NOT NULL,
  `blood_type` char(4) NOT NULL,
  `gives` varchar(32) NOT NULL,
  `receives` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `BloodGroup`
--

INSERT INTO `BloodGroup` (`blood_group_id`, `blood_type`, `gives`, `receives`) VALUES
(1, 'O-', '1,2,3,4,5,6,7,8', '1'),
(2, 'O+', '8,4,6,2', '1,2'),
(3, 'A-', '7,8,4,3', '1,3'),
(4, 'A+', '8,4', '1,2,3,4'),
(5, 'B-', '5,6,7,8', '1,5'),
(6, 'B+', '6,8', '1,2,5,6'),
(7, 'AB-', '7,8', '1,3,5,7'),
(8, 'AB+', '8', '1,2,3,4,5,6,7,8');

-- --------------------------------------------------------

--
-- Table structure for table `DonationHistory`
--

CREATE TABLE `DonationHistory` (
  `donation_id` char(36) NOT NULL,
  `donor_id` char(36) NOT NULL,
  `recepient_id` char(36) NOT NULL,
  `donated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `donation_report_id` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `DonationHistory`
--

INSERT INTO `DonationHistory` (`donation_id`, `donor_id`, `recepient_id`, `donated_date`, `donation_report_id`) VALUES
('da152b5e-c71e-4255-a626-1a43188ebf34', '52de2b2b-ccf4-49bc-9045-a5cee55f19a1', '9fcc0ba4-308a-46d7-845d-36629aef56ea', '2019-11-11 13:44:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `DonationReport`
--

CREATE TABLE `DonationReport` (
  `donation_report_id` char(36) NOT NULL,
  `report` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `DonationRequest`
--

CREATE TABLE `DonationRequest` (
  `donation_request_id` char(36) NOT NULL,
  `requester_id` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `DonorRecepient`
--

CREATE TABLE `DonorRecepient` (
  `match_id` char(36) NOT NULL,
  `donor_id` char(36) NOT NULL,
  `recepient_id` char(36) NOT NULL,
  `match_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `DonorRecepient`
--

INSERT INTO `DonorRecepient` (`match_id`, `donor_id`, `recepient_id`, `match_status`) VALUES
('a8d42a8d-deb0-42f6-b0bf-53b2c9294a67', '52de2b2b-ccf4-49bc-9045-a5cee55f19a1', 'b45925bd-286e-4d7f-b68d-1a5a95db9944', 1);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` char(36) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(64) NOT NULL,
  `birthday` datetime NOT NULL,
  `password` varchar(60) NOT NULL,
  `gender` char(1) NOT NULL,
  `is_donor` tinyint(1) NOT NULL,
  `blood_group` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `first_name`, `last_name`, `email`, `birthday`, `password`, `gender`, `is_donor`, `blood_group`, `createdAt`, `updatedAt`) VALUES
('a1cf10ea-dded-4822-a5b1-2d2d260a9c56', 'Anais', 'Jegu', 'anais@gmail.com', '1997-11-13 00:00:00', '$2b$10$8wcXrPIARXY2/qjfn2MzneitJM8ww9GH0wjqKhzQHCxCcT.MfrlO2', 'm', 0, 3, '2019-11-11 11:05:30', '2019-11-11 11:05:30'),
('b45925bd-286e-4d7f-b68d-1a5a95db9944', 'Andrew', 'Mead', 'andrew@gmail.com', '1997-11-13 00:00:00', '$2b$10$xghsBlqiZolEKmckAd/86OkAUB5LPbzg5b2gLJnIuXmVMg7rBDXCG', 'm', 1, 7, '2019-11-11 11:07:18', '2019-11-11 11:10:20'),
('52de2b2b-ccf4-49bc-9045-a5cee55f19a1', 'Andrew', 'Mead', 'anjana@gmail.com', '1997-11-13 00:00:00', '$2b$10$.r.zoNV1kYdj3qy6vY8LyOMfR3yl1LexaIdm87mo0CzP6PRh7Ym4m', 'm', 1, 7, '2019-11-11 09:34:44', '2019-11-11 11:15:06'),
('93610663-d40f-4cfa-86c1-98565d7b1191', 'Chanaka', 'DeSilva', 'bucha@gmail.com', '1997-11-13 00:00:00', '$2b$10$VYAgwGdwJBYx/X3Moe9hMO9JGNMD.X5XjO1pjX8wlp3raFPiH81B.', 'm', 0, 1, '2019-11-11 13:29:01', '2019-11-11 13:29:01'),
('7c7c2a6f-3ae6-4718-bf73-a78349c33fad', 'Chanaka', 'DeSilva', 'chanaka@gmail.com', '1997-11-13 00:00:00', '$2b$10$O.JLN5zUwx.1fhDyFLUu7uJBBNNqwgJdIecyDiEi.GCCt.ZvydTPi', 'm', 0, 1, '2019-11-11 11:05:03', '2019-11-11 11:05:03'),
('9fcc0ba4-308a-46d7-845d-36629aef56ea', 'Lahiru', 'Udayanga', 'lahiru@gmail.com', '1997-11-13 00:00:00', '$2b$10$8V9SeCrewK1pr024n6E9xOI4BGgpZlz/5icfzh5DaW95UP.qXaSoK', 'm', 1, 2, '2019-11-11 09:21:50', '2019-11-11 09:55:52'),
('3d2a9093-2a91-4f10-a90a-2978498f7672', 'Nomad', 'Soap', 'nomad@gmail.com', '1997-11-13 00:00:00', '$2b$10$6iqRzmFcip4zLtS1pkCfuecLijHyhfaE2nI7PHuLwaU23pF6Fdx3q', 'm', 0, 4, '2019-11-11 11:05:50', '2019-11-11 11:05:50'),
('8c81e475-7b2a-4731-9dcd-25546d6ef0d6', 'Captain', 'Price', 'price@gmail.com', '1997-11-13 00:00:00', '$2b$10$xG5U8RiSBo2WPAqCY5fgBeNOjl4VlK7zF76D0py3nxu1nw7cYGqJa', 'm', 0, 6, '2019-11-11 11:06:36', '2019-11-11 11:06:36'),
('3a87a2ab-f249-49fc-80f8-8f7a5c178eca', 'Soap', 'Mctavish', 'soap@gmail.com', '1997-11-13 00:00:00', '$2b$10$GnyjTSVRR/QsNH2RD6Wdqu9Hx.v9ymrRgdpZG6FXH/cPg6s9GdN8u', 'm', 0, 5, '2019-11-11 11:06:08', '2019-11-11 11:06:08'),
('71003e6d-76c7-45f8-93d8-f7a0d688cccf', 'Chanaka', 'DeSilva', 'thishun@gmail.com', '1997-11-13 00:00:00', '$2b$10$vZPvjVf1HMzRN7n8GtmEZuCpCrr776PDVBnw2D.aYN/0DNQUazl2O', 'm', 0, 1, '2019-11-11 13:40:02', '2019-11-11 13:40:02'),
('cb22ea8d-b578-43ae-beaa-92a8dd4a1245', 'Tim', 'Bukalcha', 'tim@gmail.com', '1997-11-13 00:00:00', '$2b$10$zYVpcTTzcxSqL5EGgXN7w.MNo1/b6T5T988jIz0J9N1TaL6SM29Eq', 'm', 1, 7, '2019-11-11 11:07:36', '2019-11-11 11:08:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `BloodGroup`
--
ALTER TABLE `BloodGroup`
  ADD PRIMARY KEY (`blood_group_id`);

--
-- Indexes for table `DonationHistory`
--
ALTER TABLE `DonationHistory`
  ADD PRIMARY KEY (`donation_id`),
  ADD KEY `donor_id` (`donor_id`),
  ADD KEY `recepient_id` (`recepient_id`),
  ADD KEY `donation_report_id` (`donation_report_id`);

--
-- Indexes for table `DonationReport`
--
ALTER TABLE `DonationReport`
  ADD PRIMARY KEY (`donation_report_id`);

--
-- Indexes for table `DonationRequest`
--
ALTER TABLE `DonationRequest`
  ADD PRIMARY KEY (`donation_request_id`),
  ADD KEY `requester_id` (`requester_id`);

--
-- Indexes for table `DonorRecepient`
--
ALTER TABLE `DonorRecepient`
  ADD PRIMARY KEY (`match_id`),
  ADD KEY `donor_id` (`donor_id`),
  ADD KEY `recepient_id` (`recepient_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `blood_group` (`blood_group`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `DonationHistory`
--
ALTER TABLE `DonationHistory`
  ADD CONSTRAINT `DonationHistory_ibfk_1` FOREIGN KEY (`donor_id`) REFERENCES `User` (`id`),
  ADD CONSTRAINT `DonationHistory_ibfk_2` FOREIGN KEY (`recepient_id`) REFERENCES `User` (`id`),
  ADD CONSTRAINT `DonationHistory_ibfk_3` FOREIGN KEY (`donor_id`) REFERENCES `User` (`id`),
  ADD CONSTRAINT `DonationHistory_ibfk_4` FOREIGN KEY (`recepient_id`) REFERENCES `User` (`id`),
  ADD CONSTRAINT `DonationHistory_ibfk_5` FOREIGN KEY (`donation_report_id`) REFERENCES `DonationReport` (`donation_report_id`);

--
-- Constraints for table `DonationRequest`
--
ALTER TABLE `DonationRequest`
  ADD CONSTRAINT `DonationRequest_ibfk_1` FOREIGN KEY (`requester_id`) REFERENCES `User` (`id`);

--
-- Constraints for table `DonorRecepient`
--
ALTER TABLE `DonorRecepient`
  ADD CONSTRAINT `DonorRecepient_ibfk_1` FOREIGN KEY (`donor_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `DonorRecepient_ibfk_2` FOREIGN KEY (`recepient_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `User_ibfk_1` FOREIGN KEY (`blood_group`) REFERENCES `BloodGroup` (`blood_group_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
