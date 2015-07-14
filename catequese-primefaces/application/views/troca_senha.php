<?php include PATH_TEMPLATES.'blocks/header.php'; ?>

</head>

  <body>

    <!-- Wrap all page content here -->
    <div id="wrap">

      <?php include PATH_TEMPLATES.'blocks/topo.php'; ?>

      <!-- Begin page content -->
      <div class="container">
        <div class="page-header">
          <h2>Trocar senha</h2>
        </div>

        <form role="form" method="post" action="" id="form">
          <div class="form-group">
              <label for="inputSenha">Nova Senha:</label>
              <input type="password" name="senha" id="senha" class="form-control" required><br>
          </div>
          <div class="form-group">
              <label for="inputSenha">Repita a Senha:</label>
              <input type="password" name="senha2" class="form-control" required>
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
                senha: {
                    required: "Insira uma senha"
                },
                senha2: {
                    required: "Repita a senha",
                    equalTo: "Repita as senhas corretamente"
                }
            },
            rules: {
            	senha2: {
                    equalTo: "#senha"
                }
            }
        });
    });
</script>
