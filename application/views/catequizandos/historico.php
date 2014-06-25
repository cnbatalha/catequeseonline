<?php include PATH_TEMPLATES.'blocks/header.php'; ?>

</head>

  <body>

    <!-- Wrap all page content here -->
    <div id="wrap">

      <?php include PATH_TEMPLATES.'blocks/topo.php'; ?>

      <!-- Begin page content -->
      <div class="container">
        <div class="page-header">
          <h2>Hist&oacute;rico de "<?=$turmas[0]['nome']?>"</h2>
        </div>

        <div class="table-responsive">
          <table class="table table-bordered table-striped table-hover">
           <thead>
             <tr>
             <th>Turma</th>
             <th>Data da matr&iacute;cula</th>
             </tr>
           </thead>
           <tbody>
           <?php if(empty($turmas)): ?>
                <tr><td colspan="2">Este catequizando nunca foi matriculado em nenhuma turma</td></tr>
           <?php else: ?>
                <?php foreach ( $turmas as $tur ): ?>
                  <tr>
                    <td><?=$tur['descricao']?></td>
                    <td><?=dateToBr($tur['data_matricula'])?></td>
                  </tr>
               <?php endforeach; ?>
           <?php endif; ?>
           </tbody>
        </table>
      </div>

      </div>
    </div>

<?php include PATH_TEMPLATES.'blocks/footer.php'; ?>

