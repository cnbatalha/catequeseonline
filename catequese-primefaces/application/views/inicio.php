<?php include PATH_TEMPLATES.'blocks/header.php'; ?>

</head>

  <body>

    <!-- Wrap all page content here -->
    <div id="wrap">

      <?php include PATH_TEMPLATES.'blocks/topo.php'; ?>

      <!-- Begin page content -->
      <div class="container">
        <div class="page-header">
          <h2>Comunidade <?=$comunidade['nome']?></h2>
        </div>

                <address>
                  <?=$comunidade['endereco']?><br>
                  <?=$comunidade['bairro']?><br>
                  <?=$comunidade['cidade']?><br>
                  <?=$comunidade['estado']?><br><br>
                  
                  <strong>Catequista Respons&aacute;vel:</strong><br>
                   <?=$comunidade['catequista']?><br>
                   <?=$comunidade['email']?><br>
                   <?=$comunidade['telefone']?><br><br>
                   <a href='<?=URL.'troca_senha'?>'>Trocar senha</a>
                </address>

      </div>
    </div>

<?php include PATH_TEMPLATES.'blocks/footer.php'; ?>

