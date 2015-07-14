<?php include PATH_TEMPLATES.'blocks/header.php'; ?>

</head>

  <body>

    <!-- Wrap all page content here -->
    <div id="wrap">

      <?php include PATH_TEMPLATES.'blocks/topo.php'; ?>

      <!-- Begin page content -->
      <div class="container">

        <div class="page-header">
          <h3>Matricular catequizandos</h3>
        </div>

        <form role="form" method="post" action="" id="form">
          <div class="form-group">
              <label for="inputDescricao">Turma (escolha a turma na qual deseja matricular catequizandos)</label>
              <select name="id_turma" class="form-control">
              	<?php foreach($turmas as $tur): ?>
              	  <option value="<?=$tur['id']?>"><?=$tur['descricao']?></option>
                <?php endforeach; ?>
              </select>
          </div>
          
          <div class="form-group">
              <label for="inputDescricao">Catequizandos (escolha os catequizandos que deseja matricular segurando "Ctrl")</label>
              <select multiple name="id_catequizandos[]" class="form-control" style="height:200px">
              	<?php foreach($catequizandos as $cat): ?>
              	  <option value="<?=$cat['id']?>"><?=$cat['nome']?></option>
                <?php endforeach; ?>
              </select>
          </div>
          
          <button type="submit" name="submit" value="submit" class="btn btn-primary">Matricular</button><br><br>
        </form>

      </div>
    </div>


<?php include PATH_TEMPLATES.'blocks/footer.php'; ?>