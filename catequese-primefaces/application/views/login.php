<?php include PATH_TEMPLATES.'blocks/header.php'; ?>

<link href="<?=URL_STATIC?>css/login.css" rel="stylesheet">

</head>
  <body>

    <div class="container">

      <form class="form-signin" action="" method="post">
        <h2 class="form-signin-heading">Login</h2><br>
        <?php if(!empty($error)): ?>
                <p class="text-danger">E-mail/Senha errada</p><br>
        <?php endif; ?>
        <input type="text" name="email" class="form-control" placeholder="E-mail" required autofocus>
        <input type="password" name="senha" class="form-control" placeholder="Senha" required><br>
        <button class="btn btn-lg btn-primary btn-block" name="submit" value="submit" type="submit">Entrar</button>
      </form>

    </div> <!-- /container -->
    
    
   </body>
</head>