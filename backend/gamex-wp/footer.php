</div><?php get_sidebar(); ?>

            <div class="clearfix"></div>
        </div></div><footer id="footer-wrapper" role="contentinfo">
        <div class="container row">
            <div class="footer-widgets-wrap">
                <div class="footer" id="footer-sec1">
                    <?php if ( is_active_sidebar( 'footer-1' ) ) : ?>
                        <?php dynamic_sidebar( 'footer-1' ); ?>
                    <?php endif; ?>
                </div>
                <div class="footer" id="footer-sec2">
                     <?php if ( is_active_sidebar( 'footer-2' ) ) : ?>
                        <?php dynamic_sidebar( 'footer-2' ); ?>
                    <?php endif; ?>
                </div>
                <div class="footer" id="footer-sec3">
                     <?php if ( is_active_sidebar( 'footer-3' ) ) : ?>
                        <?php dynamic_sidebar( 'footer-3' ); ?>
                    <?php endif; ?>
                </div>
            </div>
        </div><div class="clearfix"></div>

        <div id="sub-footer-wrapper">
            <div class="container row">
                 <nav id="menu-footer">
                    <?php
                    wp_nav_menu( array(
                        'theme_location' => 'footer-menu',
                        'container'      => false,
                        'depth'          => 1,
                        'fallback_cb'    => false,
                    ) );
                    ?>
                </nav>
                <div class="copyright-area">
                    Telif Hakkı © <?php echo date('Y'); ?> <a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo('name'); ?></a> Tüm Hakları Saklıdır.
                </div>
            </div>
        </div>
    </footer></div><a href="#" class="back-top" style="display: none;"><i class="fa fa-angle-up"></i></a>

<?php wp_footer(); ?>

</body>
</html>