<?php
/**
 * Kenar çubuğu şablonu
 *
 * @package GameX_WP
 */

if ( ! is_active_sidebar( 'sidebar-1' ) ) {
    return;
}
?>

<aside id="sidebar-wrapper" role="complementary">
    <?php dynamic_sidebar( 'sidebar-1' ); ?>
</aside>