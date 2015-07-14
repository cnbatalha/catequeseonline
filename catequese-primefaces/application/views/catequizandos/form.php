<?php include PATH_TEMPLATES.'blocks/header.php'; ?>

<link href="<?=URL_STATIC?>css/jquery-ui-1.10.4.custom.min.css" rel="stylesheet">


</head>

  <body>

    <!-- Wrap all page content here -->
    <div id="wrap">

      <?php include PATH_TEMPLATES.'blocks/topo.php'; ?>

      <!-- Begin page content -->
      <div class="container">

        <div class="page-header">
          <h3>Dados do catequizando</h3>
        </div>

        <form role="form" method="post" action="" id="form">
          <input type="hidden" name="id_catequizando" value="<?=$catequizando['id']?>">
          <div class="form-group" >
                    <label for="inputNome">Nome completo</label>
                    <input type="text" name="nome" class="form-control" id="inputNome" placeholder="Nome completo" value="<?=$catequizando['nome']?>" required>
                  </div>
                  <div class="form-group">
                    <label for="inputNomePai">Nome do Pai</label>
                    <input type="text" name="nome_pai" class="form-control" id="inputNomePai" placeholder="Nome do Pai" value="<?=$catequizando['nome_pai']?>" required>
                  </div>
                  <div class="form-group">
                    <label for="inputTelPai">Telefone do Pai</label>
                    <input type="text" name="telefone_pai" class="form-control" id="inputTelPai" placeholder="Telefone do Pai" value="<?=$catequizando['telefone_pai']?>" required>
                  </div>
                  <div class="form-group">
                    <label for="inputEmailPai">E-mail do Pai</label>
                    <input type="email" name="email_pai" class="form-control" id="inputNome" placeholder="E-mail do Pai" value="<?=$catequizando['email_pai']?>">
                  </div>
                  <div class="form-group">
                    <label for="inputNomeMae">Nome da M&atilde;e</label>
                    <input type="text" name="nome_mae" class="form-control" id="inputNomeMae" placeholder="Nome da M&atilde;e" value="<?=$catequizando['nome_mae']?>" required>
                  </div>
                  <div class="form-group">
                    <label for="inputTelMae">Telefone da M&atilde;e</label>
                    <input type="text" name="telefone_mae" class="form-control" id="inputTelMae" placeholder="Telefone da M&atilde;e" value="<?=$catequizando['telefone_mae']?>" required>
                  </div>
                  <div class="form-group">
                    <label for="inputEmailMae">E-mail da M&atilde;e</label>
                    <input type="email" name="email_mae" class="form-control" id="inputNome" placeholder="E-mail da M&atilde;e" value="<?=$catequizando['email_mae']?>">
                  </div>
                  <div class="form-group">
                    <label for="inputEndereco">Endere&ccedil;o</label>
                    <input type="text" name="endereco" class="form-control" id="inputEndereco" placeholder="Endere&ccedil;o" value="<?=$catequizando['endereco']?>" required>
                  </div>
                  <div class="form-group">
                    <label for="inputDataNascimento">Data de Nascimento</label>
                    <input type="text" name="data_nascimento" class="form-control" id="inputDataNascimento" placeholder="Data de Nascimento" value="<?=dateToBr($catequizando['data_nascimento'])?>" required>
                  </div>
                  <div class="checkbox">
                    <label for="inputBatizado">
                            &Eacute; Batizado?
                            <input type="checkbox" name="batizado" <?php if($catequizando['batizado'] == 1):?> checked <?php endif; ?>>
                    </label>
                  </div>
                  <div class="form-group">
                    <label for="inputDataBatismo">Data do Batismo</label>
                    <input type="text" name="data_batismo" class="form-control" id="inputDataBatismo" placeholder="Data do Batismo" value="<?=dateToBr($catequizando['data_batismo'])?>">
                  </div>
                  <div class="form-group">
                    <label for="inputParoquiaBatismo">Par&oacute;quia do Batismo</label>
                    <input type="text" name="paroquia_batismo" class="form-control" id="inputParoquiaBatismo" placeholder="Par&oacute;quia do Batismo" value="<?=$catequizando['paroquia_batismo']?>">
                  </div>
                  <div class="form-group">
                    <label for="inputNomePadrinho">Nome do Padrinho</label>
                    <input type="text" name="nome_padrinho" class="form-control" id="inputNomePadrinho" placeholder="Nome do Padrinho" value="<?=$catequizando['nome_padrinho']?>">
                  </div>
                  <div class="form-group">
                    <label for="inputNomeMadrinha">Nome da Madrinha</label>
                    <input type="text" name="nome_madrinha" class="form-control" id="inputNomeMadrinha" placeholder="Nome da Madrinha" value="<?=$catequizando['nome_madrinha']?>">
                  </div>
                  <div class="checkbox">
                    <label for="inputFezEucaristia">
                            Fez primeira Eucaristia?
                            <input type="checkbox" name="eucaristia" <?php if($catequizando['eucaristia'] == 1):?> checked <?php endif; ?>>
                    </label>
                  </div>
                  <div class="form-group">
                    <label for="inputDataEucaristia">Data da Primeira Eucaristia</label>
                    <input type="text" name="data_eucaristia" class="form-control" id="inputDataEucaristia" placeholder="Data da Primeira Eucaristia" value="<?=dateToBr($catequizando['data_eucaristia'])?>">
                  </div>
                  <div class="form-group">
                    <label for="inputParoquiaEucaristia">Par&oacute;quia da Primeira Eucaristia</label>
                    <input type="text" name="paroquia_eucaristia" class="form-control" id="inputParoquiaEucaristia" placeholder="Par&oacute;quia da Primeira Eucaristia" value="<?=$catequizando['paroquia_eucaristia']?>">
                  </div>
                  <?php if(!empty($catequizando['data_inscricao'])): ?>
                  <div class="form-group">
                    <label>Data de Inscri&ccedil;&atilde;o</label>
                    <input type="text" class="form-control" value="<?=dateToBr($catequizando['data_inscricao'])?>" disabled>
                  </div>
                  <?php endif; ?>
                  <div class="checkbox">
                    <label for="inputCoroinha">
                            &Eacute; coroinha?
                            <input type="checkbox" name="coroinha" <?php if($catequizando['coroinha'] == 1):?> checked <?php endif; ?>>
                    </label>
                  </div>
                  <div class="checkbox">
                    <label for="inputDisposicaoReunioes">
                            Pais tem disposi&ccedil;&atilde;o para participar de reuni&otilde;es?
                            <input type="checkbox" name="pais_reunioes" <?php if($catequizando['pais_reunioes'] == 1):?> checked <?php endif; ?>>
                    </label>
                  </div>
                  <div class="checkbox">
                    <label for="inputDisposicaoAtividadesMissa">
                            Pais tem disposi&ccedil;&atilde;o para participar de atividades da comunidade e da missa?
                            <input type="checkbox" name="pais_atividades" <?php if($catequizando['pais_atividades'] == 1):?> checked <?php endif; ?> >
                    </label>
                  </div>
                  <div class="form-group">
                    <label>Frequencia que vai &agrave; Missa</label>
                    <select name="frequencia_missa" class="form-control">
                        <option value=""></option>
                        <option value="Sempre" <?php if($catequizando['frequencia_missa'] == 'Sempre'): ?> selected <?php endif; ?>>Sempre</option>
                        <option value="Frequentemente" <?php if($catequizando['frequencia_missa'] == 'Frequentemente'): ?> selected <?php endif; ?>>Frequentemente</option>
                        <option value="Ocasionalmente" <?php if($catequizando['frequencia_missa'] == 'Ocasionalmente'): ?> selected <?php endif; ?>>Ocasionalmente</option>
                        <option value="Raramente" <?php if($catequizando['frequencia_missa'] == 'Raramente'): ?> selected <?php endif; ?>>Raramente</option>
                    </select>
                  </div>
                  <div class="checkbox">
                    <label for="inputMoraPais">
                            Mora com os pais?
                            <input type="checkbox" name="mora_pais" <?php if($catequizando['mora_pais'] == 1):?> checked <?php endif; ?>>
                    </label>
                  </div>
                  <div class="checkbox">
                    <label for="inputPaisCasados">
                            Pais s&atilde;o casados?
                            <input type="checkbox" name="pais_casados" <?php if($catequizando['pais_casados'] == 1):?> checked <?php endif; ?>>
                    </label>
                  </div>
                  <button type="submit" name="submit" value="submit" class="btn btn-primary">Salvar</button><br/><br/>
                </form>

      </div>
    </div>



<?php include PATH_TEMPLATES.'blocks/footer.php'; ?>
<script src="<?=URL_STATIC?>js/jquery-ui-1.10.4.custom.min.js"></script>
<script src="<?=URL_STATIC?>js/jquery.validate.min.js"></script>
<script>
    $(document).ready( function() {
        $("#form").validate({
            messages: {
                nome: {
                    required: "Digite o nome do catequizando"
                },
                nome_pai: {
                    required: "Digite o nome do pai"
                },
                telefone_pai: {
                    required: "Digite o telefone do pai"
                },
                nome_mae: {
                    required: "Digite o nome da m&atilde;e"
                },
                telefone_mae: {
                    required: "Digite o telefone de m&atilde;e"
                },
                endereco: {
                    required: "Digite o endere&ccedil;o"
                },
                data_nascimento: {
                    required: "Preencha com a data de nascimento"
                }
            }
        });

      $(function() {
        $( "#inputDataNascimento" ).datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: 'dd/mm/yy',
          defaultDate: new Date(2004,01,00)
        });
          $( "#inputDataBatismo" ).datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: 'dd/mm/yy',
          defaultDate: new Date(2004,01,00)
        });
          $( "#inputDataEucaristia" ).datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: 'dd/mm/yy',
          defaultDate: new Date(2004,01,00)
        });
      });
    });
  </script>