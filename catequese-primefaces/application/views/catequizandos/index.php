<?php include PATH_TEMPLATES.'blocks/header.php'; ?>

</head>

  <body>

    <!-- Wrap all page content here -->
    <div id="wrap">

      <?php include PATH_TEMPLATES.'blocks/topo.php'; ?>

      <!-- Begin page content -->
      <div class="container">
        <div class="page-header">
          <h2>Catequizandos</h2>
        </div>


        <div class="row">
          <form method="get" action="">
            <div class="col-md-2">
              <input type="button" onclick="location.href='<?=URL.'catequizandos/formulario'?>'" value="Cadastrar" class="btn btn-primary">
            </div>
            <div class="col-md-4">
              <input type="text" width="50%" class="form-control" id="busca" name="busca" placeholder="Digite o nome para buscar">
            </div>
            <div class="col-md-4">
              <input type="submit" onclick="location.href=''" value="Buscar" class="btn btn-default">
            </div>
          </form>
        </div><br>

        <?php if(!empty($_GET['busca'])): ?>
                <p class="text-success">Resultados da busca por "<?=$_GET['busca']?>"</p>
        <?php endif; ?>

        <div class="table-responsive">
          <table class="table table-bordered table-striped table-hover">
           <thead>
             <tr>
               <th>ID</th>
               <th>Nome</th>
               <th>Telefone do Pai</th>
               <th>Hist&oacute;rico</th>
             </tr>
           </thead>
           <tbody>
           <?php if(empty($catequizandos)): ?>
                <tr><td colspan="3">N&atilde;o h&aacute; catequizandos cadastrados</td></tr>
           <?php else: ?>
                <?php foreach ( $catequizandos as $cat ): ?>
                  <tr>
                    <td><?=$cat['id']?></td>
                    <td><a href="<?=URL.'catequizandos/formulario/'.$cat['id']?>"><?=$cat['nome']?></a></td>
                    <td><?=$cat['telefone_pai']?></td>
                    <td><a href="<?=URL.'catequizandos/historico/'.$cat['id']?>">Ver hist&oacute;rico</a></td>
                  </tr>
                <?php endforeach; ?>
           <?php endif; ?>
           </tbody>
        </table>
      </div>

      </div>
    </div>

<?php include PATH_TEMPLATES.'blocks/footer.php'; ?>

