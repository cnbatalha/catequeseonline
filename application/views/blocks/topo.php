<!-- Fixed navbar -->
      <div class="navbar navbar-default navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li <?php	if(strpos(current_url(),'inicio') !== false){ echo 'class="active"'; } ?>>
                <a href="<?=URL.'inicio'?>">In&iacute;cio</a>
              </li>
              <li <?php	if(strpos(current_url(),'catequizandos') !== false){ echo 'class="active"'; } ?>>
                <a href="<?=URL.'catequizandos'?>">Catequizandos</a>
              </li>
              <li <?php	if(strpos(current_url(),'turmas') !== false){ echo 'class="active"'; } ?>>
                <a href="<?=URL.'turmas'?>">Turmas</a>
              </li>
              <li>
                <a href="<?=URL.'sair'?>">Sair</a>
              </li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>