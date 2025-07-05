<?php
/**
 * GameX WP Tema Fonksiyonları
 *
 * @package GameX_WP
 */

// --- 1. Tema Kurulumu ve Temel Ayarlar ---
function gamex_wp_setup() {
    // Bu tema, WordPress'in belge başlığı etiketini yönetmesine izin verir.
    // functions.php'ye <title> etiketi eklemeyin, bu fonksiyon halleder.
    add_theme_support( 'title-tag' );

    // Yazılar ve sayfalar için öne çıkan görsel desteğini etkinleştirir.
    add_theme_support( 'post-thumbnails' );

    // Otomatik RSS besleme linklerini <head> içine ekler.
    add_theme_support( 'automatic-feed-links' );

    // HTML5 standartlarında arama formu, yorum formu, yorum listesi vb. oluşturur.
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ) );

    // WordPress'in yönettiği özel logo özelliğini ekler.
    add_theme_support( 'custom-logo', array(
        'height'      => 90,
        'width'       => 325,
        'flex-height' => true,
        'flex-width'  => true,
    ) );

    // Menü konumlarını kaydeder.
    register_nav_menus( array(
        'main-menu'   => esc_html__( 'Ana Menü', 'gamex-wp' ),
        'top-bar-menu' => esc_html__( 'Üst Bar Menüsü', 'gamex-wp' ),
        'footer-menu'  => esc_html__( 'Alt Bilgi Menüsü', 'gamex-wp' ),
    ) );
}
add_action( 'after_setup_theme', 'gamex_wp_setup' );

// --- 2. Widget Alanlarını (Sidebar) Kaydetme ---
function gamex_wp_widgets_init() {
    // Ana Sidebar
    register_sidebar( array(
        'name'          => esc_html__( 'Ana Kenar Çubuğu (Sidebar)', 'gamex-wp' ),
        'id'            => 'sidebar-1',
        'description'   => esc_html__( 'Sağ kenar çubuğuna widget\'larınızı ekleyin.', 'gamex-wp' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<div class="widget-title"><h3>',
        'after_title'   => '</h3></div>',
    ) );

    // Footer Widget Alanları (Blogger temasındaki 3'lü yapıya göre)
    register_sidebar( array(
        'name'          => esc_html__( 'Footer - Sol', 'gamex-wp' ),
        'id'            => 'footer-1',
        'description'   => esc_html__( 'Footer sol sütun widget alanı.', 'gamex-wp' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<div class="widget-title"><h3>',
        'after_title'   => '</h3></div>',
    ) );

    register_sidebar( array(
        'name'          => esc_html__( 'Footer - Orta', 'gamex-wp' ),
        'id'            => 'footer-2',
        'description'   => esc_html__( 'Footer orta sütun widget alanı.', 'gamex-wp' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<div class="widget-title"><h3>',
        'after_title'   => '</h3></div>',
    ) );

     register_sidebar( array(
        'name'          => esc_html__( 'Footer - Sağ', 'gamex-wp' ),
        'id'            => 'footer-3',
        'description'   => esc_html__( 'Footer sağ sütun widget alanı.', 'gamex-wp' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<div class="widget-title"><h3>',
        'after_title'   => '</h3></div>',
    ) );
}
add_action( 'widgets_init', 'gamex_wp_widgets_init' );

// --- 3. CSS ve JavaScript Dosyalarını Yükleme ---
function gamex_wp_scripts() {
    // Ana stil dosyası (style.css)
    wp_enqueue_style( 'gamex-wp-style', get_stylesheet_uri(), array(), '1.0' );

    // Google Fonts
    wp_enqueue_style( 'gamex-wp-fonts', 'https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i', array(), null );

    // Font Awesome
    wp_enqueue_style( 'font-awesome', 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', array(), '4.7.0' );

    // --- JavaScript Dosyaları ---
    // WordPress'in kendi jQuery'sini kullanıyoruz.
    wp_enqueue_script( 'jquery' );

    // Owl Carousel (Tema klasörünüzde /js/owl.carousel.min.js olarak bulunmalı)
    wp_enqueue_script( 'owl-carousel', get_template_directory_uri() . '/js/owl.carousel.min.js', array( 'jquery' ), '2.0.0', true );

    // Theia Sticky Sidebar (Tema klasörünüzde /js/theia-sticky-sidebar.min.js olarak bulunmalı)
    wp_enqueue_script( 'theia-sticky-sidebar', get_template_directory_uri() . '/js/theia-sticky-sidebar.min.js', array( 'jquery' ), '1.7.0', true );

    // Ana tema fonksiyonları (Tema klasörünüzde /js/main.js olarak oluşturulacak)
    wp_enqueue_script( 'gamex-wp-main', get_template_directory_uri() . '/js/main.js', array( 'jquery', 'owl-carousel', 'theia-sticky-sidebar' ), '1.0', true );
    
    // Yorumlar için gerekli script (sadece yazı sayfalarında yüklenir)
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'gamex_wp_scripts' );

?>