<?php include PATH_TEMPLATES.'blocks/header.php'; ?>

</head>

  <body>

    <!-- Wrap all page content here -->
    <div id="wrap">

      <?php include PATH_TEMPLATES.'blocks/topo.php'; ?>

      <!-- Begin page content -->
      <div class="container">
        <div class="page-header">
          <h2>Matriculados na turma "<?=$catequizandos[0]['descricao']?>"</h2>
        </div>

        <div class="table-responsive">
          <table class="table table-bordered table-striped table-hover">
           <thead>
             <tr>
             <th>Nome</th>
             <th>Data da matr&iacute;cula</th>
             </tr>
           </thead>
           <tbody>
           <?php if(empty($catequizandos)): ?>
                <tr><td colspan="2">N&atilde;o h&aacute; matriculados</td></tr>
           <?php else: ?>
                <?php foreach ( $catequizandos as $cat ): ?>
                  <tr>
                    <td><?=$cat['nome']?></td>
                    <td><?=dateToBr($cat['data_matricula'])?></td>
                  </tr>
               <?php endforeach; ?>
           <?php endif; ?>
           </tbody>
        </table>
      </div>

      </div>
    </div>

<?php include PATH_TEMPLATES.'blocks/footer.php'; ?>

