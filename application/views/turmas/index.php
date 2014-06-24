<?php include PATH_TEMPLATES.'blocks/header.php'; ?>

</head>

  <body>

    <!-- Wrap all page content here -->
    <div id="wrap">

      <?php include PATH_TEMPLATES.'blocks/topo.php'; ?>

      <!-- Begin page content -->
      <div class="container">
        <div class="page-header">
          <h2>Turmas</h2>
        </div>


        <div class="row">
            <div class="col-md-2">
              <input type="button" onclick="location.href='<?=URL.'turmas/formulario'?>'" value="Cadastrar" class="btn btn-primary">
            </div>
        </div><br>

        <div class="table-responsive">
          <table class="table table-bordered table-striped table-hover">
           <thead>
             <tr>
             <th>Turma</th>
             <th>Ano</th>
             <th>Sala</th>
             <th>Hor&aacute;rio</th>
             <th>Dia</th>
             <th>Matriculados</th>
             </tr>
           </thead>
           <tbody>
           <?php if(empty($turmas)): ?>
                <tr><td colspan="6">N&atilde;o h&aacute; turmas cadastradas</td></tr>
           <?php else: ?>
                <?php foreach ( $turmas as $tur ): ?>
                  <tr>
                    <td><a href="<?=URL.'turmas/formulario/'.$tur['id']?>"><?=$tur['descricao']?></a></td>
                    <td><?=$tur['ano']?></td>
                    <td><?=$tur['sala']?></td>
                    <td><?=$tur['horario']?></td>
                    <td><?=$tur['dia_semana']?></td>
                    <td><a href="/turmas/matriculados/{{ tur.id }}/">Ver matriculados</a></td>
                  </tr>
               <?php endforeach; ?>
           <?php endif; ?>
           </tbody>
        </table>
      </div>

      </div>
    </div>

<?php include PATH_TEMPLATES.'blocks/footer.php'; ?>

