<?php include PATH_TEMPLATES.'blocks/header.php'; ?>

</head>

  <body>

    <!-- Wrap all page content here -->
    <div id="wrap">

      <?php include PATH_TEMPLATES.'blocks/topo.php'; ?>

      <!-- Begin page content -->
      <div class="container">

        <div class="page-header">
          <h3>Dados da turma</h3>
        </div>

        <form role="form" method="post" action="" id="form">
          <input type="hidden" name="id_turma" value="<?=$turma['id']?>">
          <div class="form-group">
              <label for="inputDescricao">Descri&ccedil;&atilde;o (coloque algo que identifique a turma)</label>
              <input type="text" name="descricao" class="form-control" id="inputDescricao" placeholder="" value="<?=$turma['descricao']?>" required>
          </div>
          <div class="form-group">
              <label for="inputAno">Ano (ex: 2013)</label>
              <input type="text" name="ano" class="form-control" id="inputAno" placeholder="" value="<?=$turma['ano']?>" required>
          </div>
          <div class="form-group">
              <label for="inputDia">Dia da Semana em que ocorre os Encontros</label>
              <input type="text" name="dia_semana" class="form-control" id="inputDia" placeholder="Dia da semana" value="<?=$turma['dia_semana']?>" required>
          </div>
          <div class="form-group">
              <label for="inputHorario">Hor&aacute;rio dos Encontros</label>
              <input type="text" name="horario" class="form-control" id="inputHorario" placeholder="Hor&aacute;rio dos Encontros" value="<?=$turma['horario']?>" required>
          </div>
          <div class="form-group">
              <label for="inputSala">Sala</label>
              <input type="text" name="sala" class="form-control" id="inputSala" placeholder="Sala" value="<?=$turma['sala']?>">
          </div>
          <button type="submit" name="submit" value="submit" class="btn btn-primary">Salvar</button><br><br>
        </form>

      </div>
    </div>


<?php include PATH_TEMPLATES.'blocks/footer.php'; ?>
<script src="<?=URL_STATIC?>js/jquery.validate.min.js"></script>
<script>
    $(document).ready( function() {
        $("#form").validate({
            messages: {
                descricao: {
                    required: "Insira uma descri&ccedil;&atilde;o que identifique a turma"
                },
                ano: {
                    required: "Digite o ano da turma"
                },
                dia_semana: {
                    required: "Insira o dia em que ocorrem os encontros"
                },
                horario: {
                    required: "Insira o hor&aacute;rio que ocorrem os encontros"
                }
            }
        });
    });
</script>