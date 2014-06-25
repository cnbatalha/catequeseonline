

--
-- Database: `catequeseonline`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `catequizandos`
--

CREATE TABLE IF NOT EXISTS `catequizandos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comunidade` int(11) NOT NULL,
  `nome` varchar(80) NOT NULL,
  `nome_pai` varchar(80) NOT NULL,
  `nome_mae` varchar(80) NOT NULL,
  `telefone_pai` varchar(15) NOT NULL,
  `telefone_mae` varchar(15) NOT NULL,
  `email_pai` varchar(50) DEFAULT NULL,
  `email_mae` varchar(50) DEFAULT NULL,
  `endereco` varchar(200) NOT NULL,
  `data_nascimento` date NOT NULL,
  `batizado` tinyint(1) NOT NULL,
  `data_batismo` date DEFAULT NULL,
  `paroquia_batismo` varchar(80) DEFAULT NULL,
  `nome_padrinho` varchar(80) DEFAULT NULL,
  `nome_madrinha` varchar(80) DEFAULT NULL,
  `eucaristia` tinyint(1) NOT NULL,
  `data_eucaristia` date DEFAULT NULL,
  `paroquia_eucaristia` varchar(80) DEFAULT NULL,
  `data_inscricao` date NOT NULL,
  `coroinha` tinyint(1) NOT NULL,
  `pais_reunioes` tinyint(1) NOT NULL,
  `pais_atividades` tinyint(1) NOT NULL,
  `frequencia_missa` varchar(30) DEFAULT NULL,
  `mora_pais` tinyint(1) NOT NULL,
  `pais_casados` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Extraindo dados da tabela `catequizandos`
--

INSERT INTO `catequizandos` (`id`, `comunidade`, `nome`, `nome_pai`, `nome_mae`, `telefone_pai`, `telefone_mae`, `email_pai`, `email_mae`, `endereco`, `data_nascimento`, `batizado`, `data_batismo`, `paroquia_batismo`, `nome_padrinho`, `nome_madrinha`, `eucaristia`, `data_eucaristia`, `paroquia_eucaristia`, `data_inscricao`, `coroinha`, `pais_reunioes`, `pais_atividades`, `frequencia_missa`, `mora_pais`, `pais_casados`) VALUES
(1, 1, 'Jorge neto2', 'Jorge pai', 'mae do jorge', 'xxxxxxx', '1231231231', 'aodkaosd@aoskdoa.com', NULL, 'asdasdasdasdasd', '2014-03-05', 0, NULL, NULL, NULL, NULL, 0, NULL, NULL, '2014-06-18', 1, 1, 1, 'Sempre', 1, 1),
(2, 1, 'Filipe Marques', 'José Mauro', 'aureni', '1231231', '123123', NULL, NULL, 'asdasdasd', '2004-01-02', 0, '2004-01-15', NULL, NULL, NULL, 0, '2004-01-22', NULL, '2014-06-22', 1, 0, 0, 'Sempre', 0, 0),
(3, 1, 'Filipe Marques', '0', '0', '1231231', '123123', '', '', 'asdasdasd', '0000-00-00', 0, '0000-00-00', '0', '', '', 0, '0000-00-00', '', '2014-06-22', 1, 0, 0, '', 0, 0),
(4, 1, 'Maura Marques', 'José Mauro', 'Aureni Marques', '2123123', '12312312', '', '', 'asdasdasd', '0000-00-00', 1, '0000-00-00', '', '', '', 0, '0000-00-00', '', '2014-06-24', 0, 0, 0, 'Sempre', 0, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `comunidade`
--

CREATE TABLE IF NOT EXISTS `comunidade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `telefone` varchar(15) NOT NULL,
  `catequista` varchar(80) NOT NULL,
  `endereco` varchar(200) NOT NULL,
  `bairro` varchar(80) NOT NULL,
  `cidade` varchar(80) NOT NULL,
  `estado` varchar(2) NOT NULL,
  `data_cadastro` date NOT NULL,
  `senha` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Extraindo dados da tabela `comunidade`
--

INSERT INTO `comunidade` (`id`, `nome`, `email`, `telefone`, `catequista`, `endereco`, `bairro`, `cidade`, `estado`, `data_cadastro`, `senha`) VALUES
(1, 'Jesus de Nazaré', 'nn@gmail.com', '92 9111-1111', 'Nairam Salazar', 'Conjunto manauense rua F sem numero', 'Nossa senhora das graças', 'Manaus', 'AM', '2014-06-21', '81dc9bdb52d04dc20036dbd8313ed055');

-- --------------------------------------------------------

--
-- Estrutura da tabela `matriculados`
--

CREATE TABLE IF NOT EXISTS `matriculados` (
  `turma` int(11) NOT NULL,
  `catequizando` int(11) NOT NULL,
  `atual` tinyint(1) NOT NULL,
  `data_matricula` date NOT NULL,
  PRIMARY KEY (`turma`,`catequizando`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `matriculados`
--

INSERT INTO `matriculados` (`turma`, `catequizando`, `atual`, `data_matricula`) VALUES
(1, 1, 0, '2014-06-25'),
(1, 2, 1, '2014-06-25'),
(1, 3, 1, '2014-06-25'),
(1, 4, 0, '2014-06-25'),
(2, 1, 1, '2014-06-25'),
(2, 4, 1, '2014-06-25');

-- --------------------------------------------------------

--
-- Estrutura da tabela `turmas`
--

CREATE TABLE IF NOT EXISTS `turmas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comunidade` int(11) NOT NULL,
  `descricao` varchar(120) NOT NULL,
  `ano` varchar(4) NOT NULL,
  `dia_semana` varchar(20) NOT NULL,
  `horario` varchar(10) NOT NULL,
  `sala` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `turmas`
--

INSERT INTO `turmas` (`id`, `comunidade`, `descricao`, `ano`, `dia_semana`, `horario`, `sala`) VALUES
(1, 1, 'Crisma 2 etapa', '2013', 'domingos', '10gh', NULL),
(2, 1, 'Prezinho 2', '2014', 'sabados', '8h', 'a');

