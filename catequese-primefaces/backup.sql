

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


CREATE TABLE IF NOT EXISTS `matriculados` (
  `turma` int(11) NOT NULL,
  `catequizando` int(11) NOT NULL,
  `atual` tinyint(1) NOT NULL,
  `data_matricula` date NOT NULL,
  PRIMARY KEY (`turma`,`catequizando`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



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

