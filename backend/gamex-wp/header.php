<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<div id="outer-wrapper">
    <div class="header-back-wrap">

        <div id="top-bar">
            <div class="container row">
                <nav class="top-bar-nav">
                    <?php
                    wp_nav_menu( array(
                        'theme_location' => 'top-bar-menu',
                        'container'      => false,
                        'menu_class'     => '',
                        'fallback_cb'    => false,
                    ) );
                    ?>
                </nav>
                <div class="top-bar-social social social-color">
                     </div>
                <div class="clearfix"></div>
            </div>
        </div>

        <header id="header-wrap" role="banner">
            <div class="header-header">
                <div class="container row">
                    <div class="header-logo">
                        <?php
                        if ( has_custom_logo() ) {
                            the_custom_logo();
                        } else {
                            ?>
                            <h1><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
                            <p><?php bloginfo( 'description' ); ?></p>
                            <?php
                        }
                        ?>
                    </div>
                    <div class="header-asd">
                        </div>
                    <div class="clearfix"></div>
                </div>
            </div>

            <div class="header-menu">
                <div class="container row">
                    <nav id="main-menu" role="navigation">
                        <?php
                        wp_nav_menu( array(
                            'theme_location' => 'main-menu',
                            'container'      => false,
                            'menu_id'        => 'main-menu-nav',
                            'fallback_cb'    => false,
                        ) );
                        ?>
                    </nav>
                    <div id="nav-search">
                        <?php get_search_form(); ?>
                        <span class="hide-search"></span>
                    </div>
                    <span class="show-search"></span>
                </div>
            </div>

        </header></div><div class="row" id="content-wrapper">
        <div class="container">
            <div id="main-wrapper">