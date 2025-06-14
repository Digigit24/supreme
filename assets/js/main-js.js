jQuery.noConflict()(function ($) {
  "use strict";
  var $window = window,
    offset = "90%",
    $doc = $(document),
    self = this,
    $body = $("body"),
    TweenMax = window.TweenMax,
    fl_theme = window.fl_theme || {};
  fl_theme.window = $(window);
  fl_theme.document = $(document);
  window.fl_theme = fl_theme;
  fl_theme.window = $(window);

  // Open Close Mobile Navigation
  fl_theme.initMobileNavigationOpenClose = function () {
    var $navbar_wrapper = $(".fl-mobile-menu-wrapper"),
      $navbar_menu_sidebar = $(".fl--mobile-menu-navigation-wrapper"),
      $hamburgerbars = $(".fl--hamburger-menu-wrapper,.fl--hamburger-menu"),
      $social_profiles = $(
        ".fl-mobile-menu-wrapper ul.fl-sidebar-social-profiles li a"
      ),
      OpenNavBar = void 0;

    self.fullscreenNavbarIsOpened = function () {
      return OpenNavBar;
    };

    self.toogleOpenCloseMobileMenu = function () {
      self[OpenNavBar ? "closeFullscreenNavbar" : "openFullscreenNavbar"]();
    };
    self.openFullscreenNavbar = function () {
      if (OpenNavBar || !$navbar_wrapper.length) {
        return;
      }
      OpenNavBar = 1;

      var $navbarMenuItems = $navbar_wrapper.find(
        ".fl--mobile-menu >li >a,.fl--mobile-menu li.opened .sub-menu >li >a"
      );
      if (!$navbar_wrapper.find(".fl--mobile-menu >li.opened").length) {
        $navbarMenuItems = $navbar_wrapper.find(".fl--mobile-menu >li >a");
      }

      $hamburgerbars.addClass("opened");
      $hamburgerbars.removeClass("closed");

      // NavBarMenu Items Animation
      TweenMax.set($navbarMenuItems, {
        opacity: 0,
        x: "-20%",
        force3D: true,
      });

      TweenMax.staggerTo(
        $navbarMenuItems,
        0.2,
        {
          opacity: 1,
          x: "0%",
          delay: 0.4,
        },
        0.04
      );

      // Social Profiles Animation
      TweenMax.set($social_profiles, {
        opacity: 0,
        y: "-100%",
        force3D: true,
      });

      TweenMax.staggerTo(
        $social_profiles,
        0.2,
        {
          opacity: 1,
          y: "0%",
          delay: 0.6,
        },
        0.04
      );

      // NavBarMenu wrapper Animation
      TweenMax.set($navbar_wrapper, {
        display: "none",
        force3D: true,
      });

      TweenMax.to(
        $navbar_wrapper,
        0.4,
        {
          opacity: 1,
          display: "block",
        },
        0.04
      );

      // NavBarMenu menu sidebar Animation
      TweenMax.set($navbar_menu_sidebar, {
        opacity: 0,
        x: "-100%",
        force3D: true,
      });

      TweenMax.to(
        $navbar_menu_sidebar,
        0.4,
        {
          opacity: 1,
          x: "0%",
          display: "block",
        },
        0.04
      );

      $navbar_wrapper.addClass("open");
    };

    self.closeFullscreenNavbar = function (dontTouchBody) {
      if (!OpenNavBar || !$navbar_wrapper.length) {
        return;
      }
      OpenNavBar = 0;

      // disactive all togglers
      $hamburgerbars.removeClass("opened");
      $hamburgerbars.addClass("closed");

      var $navbarMenuItems = $navbar_wrapper.find(".fl--mobile-menu >li >a");

      // set top position and animate
      TweenMax.to($navbar_wrapper, 0.4, {
        force3D: true,
        opacity: 0,
        display: "none",
        delay: 0.1,
      });

      TweenMax.to(
        $navbar_menu_sidebar,
        0.2,
        {
          opacity: 0,
          x: "-100%",
          force3D: true,
          delay: 0.3,
        },
        0.1
      );

      TweenMax.to(
        $navbarMenuItems,
        0.2,
        {
          opacity: 0,
          x: "-20%",
          delay: 0.2,
        },
        0.1
      );

      // open navbar block
      $navbar_wrapper.removeClass("open");
    };

    $doc.on(
      "click",
      ".mobile-menu-btn,.fl--mobile-menu-icon,.fl--hamburger-menu",
      function (e) {
        self.toogleOpenCloseMobileMenu();
        e.preventDefault();
      }
    );
  };
  // Mobile Menu
  fl_theme.initMobileNavigationSubMenuAnimation = function () {
    var $mobileMenu = $(".fl--mobile-menu");

    $mobileMenu.find("li").each(function () {
      var $this = $(this);
      if ($this.find("ul").length > 0) {
        $this
          .find("> a")
          .append(
            '<span class="fl-menu-flipper-icon fl--open-child-menu"><span class="fl-front-content"><i class="fl-custom-icon-list-style-6"></i></span><span class="fl-back-content"><i class="fl-custom-icon-cancel-5"></i></span></span>'
          );
      }
    });

    // open -> close sub-menu
    function toggleSub_menu($sub_menu_find) {
      var $navigation_Items = $sub_menu_find.find(".sub-nav >.sub-menu >li >a");

      if (!$sub_menu_find.find(".sub-nav >.sub-menu >li.opened").length) {
        $navigation_Items = $sub_menu_find.find(".sub-menu >li >a");
      }

      TweenMax.set(
        $navigation_Items,
        {
          opacity: 0,
          x: "-20%",
          force3D: true,
        },
        0.04
      );
      if ($sub_menu_find.hasClass("opened")) {
        $sub_menu_find.removeClass("opened");
        $sub_menu_find.find("li").removeClass("opened");
        $sub_menu_find.find("ul").slideUp(200);
        TweenMax.staggerTo(
          $navigation_Items,
          0.3,
          {
            opacity: 0,
            x: "-20%",
            force3D: true,
          },
          0.04
        );
        console.log($navigation_Items);
      } else {
        TweenMax.staggerTo(
          $navigation_Items,
          0.3,
          {
            x: "0%",
            opacity: 1,
            delay: 0.2,
          },
          0.04
        );

        $sub_menu_find.addClass("opened");
        if (!$sub_menu_find.children("ul").length) {
          $sub_menu_find.find("div").children("ul").slideDown();
        } else {
          $sub_menu_find.children("ul").slideDown();
        }
        // Sub menu Children
        $sub_menu_find.siblings("li").children("ul").slideUp(200);
        $sub_menu_find.siblings("li").removeClass("opened");
        $sub_menu_find.siblings("li").find("li").removeClass("opened");
        $sub_menu_find.siblings("li").find("ul").slideUp(200);
      }
    }

    $mobileMenu.on("click", "li.has-submenu >a", function (e) {
      toggleSub_menu($(this).parent());
      e.preventDefault();
    });
  };
  fl_theme.initMobileNavigationOpenClose();
  fl_theme.initMobileNavigationSubMenuAnimation();
  if ($("input.tm_booking_date").length) {
    $("input.tm_booking_date").daterangepicker();
  }

  // Gallery Image
  if ($(".templines-gallery-grid-post-type").length) {
    $(".templines-gallery-grid-post-type").imagesLoaded(function () {
      var $grid = $(".templines-gallery-grid-post-type").isotope({
        itemSelector: ".templines-gallery-item",
        layoutMode: "packery",
        packery: {
          gutter: 24,
        },
      });
    });
  }

  const $faqItems = $(".faq-item");
  const $firstItem = $faqItems.first();
  $firstItem.addClass("active");
  $firstItem.find(".faq-content").slideDown();

  $(".faq-title").on("click", function () {
    const $currentItem = $(this).closest(".faq-item");
    if ($currentItem.hasClass("active")) {
      $currentItem.removeClass("active");
      $currentItem.find(".faq-content").slideUp();
    } else {
      $faqItems.not($currentItem).removeClass("active");
      $faqItems.not($currentItem).find(".faq-content").slideUp();
      $currentItem.addClass("active");
      $currentItem.find(".faq-content").slideDown();
    }
  });

  $("select.select-search").niceSelect();
  $("select#templines-sort-property").niceSelect();
  $(".catalog-list-aside-form__categories select").each(function () {
    $(this).niceSelect();
  });
  fl_theme.OpenAndCloseLangChanger = function () {
    $(".lang-changer-wrap a.active-lang").on("click", function (event) {
      event.preventDefault();
      if (!$(".changer-lang-wrap").hasClass("opened")) {
        $(".changer-lang-wrap").addClass("opened");
      } else {
        $(".changer-lang-wrap").removeClass("opened");
      }
      event.stopPropagation();
    });
    $(document).on("click", function (event) {
      if (!$(event.target).closest(".changer-lang-wrap").length) {
        if ($(".changer-lang-wrap").hasClass("opened")) {
          $(".changer-lang-wrap").removeClass("opened");
        }
      }
    });
    $(document).on("click", function (event) {
      if (
        !$(event.target).closest(
          ".templines-search-drop-down-menu, .top-search-info-content"
        ).length
      ) {
        if ($(".templines-search-drop-down-menu").hasClass("opened")) {
          $(".templines-search-drop-down-menu").removeClass("opened");
        }
      }
    });
    $(document).on("keyup", function (event) {
      if (event.key === "Escape") {
        if ($(".changer-lang-wrap").hasClass("opened")) {
          $(".changer-lang-wrap").removeClass("opened");
        }
        if ($(".templines-search-drop-down-menu").hasClass("opened")) {
          $(".templines-search-drop-down-menu").removeClass("opened");
        }
      }
    });
  };
  fl_theme.OpenAndCloseLangChanger();

  $(".search-form-content.templines-has-drop-down-menu").on(
    "click",
    ".top-search-info-content",
    function (event) {
      event.preventDefault();
      event.stopPropagation();
      $(this).next(".templines-search-drop-down-menu").toggleClass("opened");
    }
  );

  gsap
    .timeline()
    .to(".regard-span .bg", {
      delay: 0.6,
      duration: 1.4,
      ease: "power4.out",
      x: "100%",
    })
    .to(
      ".regard-span span",
      {
        delay: -0.9,
        duration: 1.9,
        opacity: 1,
        x: "0%",
        ease: "power4.inOut",
      },
      "-=0.7"
    );

  $(".price-search-form-wrap").each(function () {
    var $this = $(this);
    var slider_price = $this.find("#slider-range");
    var btn_reset = $this.find(".btn-reset-slider");
    var top_search_info = $this
      .closest(".search-form-content")
      .find(".top-search-info-content");

    if (slider_price.length) {
      var min_price = slider_price.data("min-value"),
        max_price = slider_price.data("max-value"),
        preview_text = top_search_info.data("preview-text"),
        min_price_text = top_search_info.data("min-price-text"),
        max_price_text = top_search_info.data("max-price-text");
      var currency_symbol = top_search_info.data("currency-symbol");

      slider_price.slider({
        range: true,
        orientation: "horizontal",
        min: min_price,
        max: max_price,
        values: [min_price, max_price],
        step: 1,
        slide: function (event, ui) {
          if (ui.values[0] == ui.values[1]) {
            return false;
          }
          top_search_info.html(
            min_price_text +
              " <span>" +
              ui.values[0] +
              " " +
              currency_symbol +
              "</span> - " +
              max_price_text +
              " <span>" +
              ui.values[1] +
              " " +
              currency_symbol +
              "</span>"
          );
          btn_reset.fadeIn();
        },
      });

      $this.find(".reset-price-btn").on("click", function () {
        slider_price.slider("values", [min_price, max_price]);
        top_search_info.text(preview_text);
        btn_reset.fadeOut();
        $this.closest(".templines-search-drop-down-menu").removeClass("opened");
      });
    }
  });

  $(".catalog-list-aside-form__range").each(function () {
    var $this = $(this);
    var slider_area = $this.find(".price-filter-range");
    var slider_min_val = $this.find(".slider-min-val");
    var slider_max_val = $this.find(".slider-max-val");
    var slider_item_price_form = $this.find(".slider-item-price-form");
    var slider_item_price_to = $this.find(".slider-item-price-to");

    if (slider_area.length) {
      var min_area = slider_area.data("min-value"),
        max_area = slider_area.data("max-value");

      slider_area.slider({
        range: true,
        orientation: "horizontal",
        min: min_area,
        max: max_area,
        values: [min_area, max_area],
        step: 1,
        slide: function (event, ui) {
          if (ui.values[0] == ui.values[1]) {
            return false;
          }

          slider_min_val.val(ui.values[0]);
          slider_item_price_form.text(ui.values[0]);

          slider_max_val.val(ui.values[1]);
          slider_item_price_to.text(ui.values[1]);
        },
      });

      $this.find(".reset-slider-btn").on("click", function () {
        slider_area.slider("values", [min_area, max_area]);
        slider_min_val.val(min_area);
        slider_item_price_form.text(min_area);
        slider_max_val.val(max_area);
        slider_item_price_to.text(max_area);
      });
    }
  });

  $(".templines-input-number-wrap").each(function () {
    var $this = $(this);
    var number_content = $this.find(".number-content");
    var input_rooms = $this.find('input[name="rooms"]');
    var btn_minus = $this.find(".templines-minus-input");
    var btn_plus = $this.find(".templines-plus-input");

    var interval;

    function decreaseValue() {
      var current_value = parseInt(number_content.text()) || 0;

      if (current_value > 1) {
        current_value--;
        number_content.text(current_value);
        input_rooms.val(current_value);
      } else {
        number_content.text("All");
        input_rooms.val("");
      }
    }

    function increaseValue() {
      var current_value = parseInt(number_content.text()) || 0;
      current_value++;
      number_content.text(current_value);
      input_rooms.val(current_value);
    }

    btn_minus
      .on("mousedown touchstart", function () {
        decreaseValue();
        interval = setInterval(decreaseValue, 200);
      })
      .on("mouseup touchend mouseleave", function () {
        clearInterval(interval);
      });

    btn_plus
      .on("mousedown touchstart", function () {
        increaseValue();
        interval = setInterval(increaseValue, 200);
      })
      .on("mouseup touchend mouseleave", function () {
        clearInterval(interval);
      });
  });

  let userId = localStorage.getItem("userId");

  if (!userId) {
    userId = `user_${new Date().getTime()}`;
    localStorage.setItem("userId", userId);
  }

  localStorage.setItem(
    `data_${userId}`,
    JSON.stringify({ name: userId, age: 30 })
  );

  const userData = JSON.parse(localStorage.getItem(`data_${userId}`));
  console.log(userData); // Виведе { name: "John", age: 30 }

  var swiper = new Swiper(".icon-box-swiper-slider", {
    slidesPerView: 3,
    spaceBetween: 24,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl:
        ".icon-box-swiper-slider-arrow-pagination .next-arrow-swiper-button",
      prevEl:
        ".icon-box-swiper-slider-arrow-pagination .prev-arrow-swiper-button",
    },
    breakpoints: {
      991: {
        slidesPerView: 3,
      },
      776: {
        slidesPerView: 2,
      },
      300: {
        slidesPerView: 1,
      },
    },
  });

  var swiper = new Swiper(".property-swiper-slider", {
    slidesPerView: 3,
    spaceBetween: 24,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl:
        ".property-swiper-slider-arrow-pagination .next-arrow-swiper-button",
      prevEl:
        ".property-swiper-slider-arrow-pagination .prev-arrow-swiper-button",
    },
    breakpoints: {
      991: {
        slidesPerView: 3,
      },
      776: {
        slidesPerView: 2,
      },
      300: {
        slidesPerView: 1,
      },
    },
  });

  var swiper = new Swiper(".templines-team-slider", {
    slidesPerView: 4,
    spaceBetween: 24,
    pagination: {
      el: ".team-slider-dots",
      clickable: true,
    },
    breakpoints: {
      992: {
        slidesPerView: 4,
      },
      776: {
        slidesPerView: 3,
      },
      300: {
        slidesPerView: 1,
      },
    },
  });

  var swiper = new Swiper(".templines-blog-posts-slider", {
    slidesPerView: 3,
    spaceBetween: 24,
    navigation: {
      nextEl:
        ".blog-posts-swiper-slider-arrow-pagination .next-arrow-swiper-button",
      prevEl:
        ".blog-posts-swiper-slider-arrow-pagination .prev-arrow-swiper-button",
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
      },
      776: {
        slidesPerView: 2,
      },

      300: {
        slidesPerView: 1,
      },
    },
  });
  var swiper = new Swiper(".templines-property-slider", {
    slidesPerView: 4,
    spaceBetween: 24,
    navigation: {
      nextEl:
        ".property-swiper-slider-arrow-pagination .next-arrow-swiper-button",
      prevEl:
        ".property-swiper-slider-arrow-pagination .prev-arrow-swiper-button",
    },
    breakpoints: {
      991: {
        slidesPerView: 4,
      },
      776: {
        slidesPerView: 3,
      },
      300: {
        slidesPerView: 1,
      },
    },
  });

  var swiper = new Swiper(
    ".templines-testimonial-slider.testimonial-slider-style-one",
    {
      slidesPerView: 3,
      spaceBetween: 24,
      navigation: {
        nextEl:
          ".testimonial-swiper-slider-arrow-pagination .next-arrow-swiper-button",
        prevEl:
          ".testimonial-swiper-slider-arrow-pagination .prev-arrow-swiper-button",
      },
      breakpoints: {
        991: {
          slidesPerView: 3,
        },
        776: {
          slidesPerView: 1,
        },
        300: {
          slidesPerView: 1,
        },
      },
    }
  );

  var swiper = new Swiper(".main-screen-image-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 1500,
    navigation: {
      nextEl:
        ".main-screen-home-page-slider-pagination .next-arrow-swiper-main-screen-button",
      prevEl:
        ".main-screen-home-page-slider-pagination .prev-arrow-swiper-main-screen-button",
    },
  });

  const numberOfSlides = document.querySelectorAll(
    ".templines-tabs-slider-top .swiper-slide"
  ).length;
  var TabsSwiperTop = new Swiper(".templines-tabs-slider-top", {
    slidesPerView: "auto",
    spaceBetween: 15,
    centeredSlides: true,
    centeredSlidesBounds: true,
    initialSlide: 0,
    updateOnWindowResize: true,
    touchRatio: 0,
  });
  var TabsSwiperBottom = new Swiper(".templines-tabs-slider-bottom", {
    slidesPerView: 1,
    spaceBetween: 27,
    thumbs: {
      swiper: TabsSwiperTop,
    },
  });

  var swiper = new Swiper(
    ".templines-testimonial-slider.testimonial-slider-style-two",
    {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      navigation: {
        nextEl:
          ".testimonial-swiper-slider-arrow-pagination .next-arrow-swiper-button",
        prevEl:
          ".testimonial-swiper-slider-arrow-pagination .prev-arrow-swiper-button",
      },
    }
  );

  const swiperGallery = new Swiper(".templines-gallery-slider", {
    slidesPerView: 4,
    spaceBetween: 24,
    loop: false,
    simulateTouch: true,
    allowTouchMove: true,
    effect: "slide",
    navigation: {
      nextEl:
        ".testimonial-swiper-slider-arrow-pagination .next-arrow-swiper-button",
      prevEl:
        ".testimonial-swiper-slider-arrow-pagination .prev-arrow-swiper-button",
    },
    breakpoints: {
      992: {
        slidesPerView: 4,
      },
      776: {
        slidesPerView: 3,
      },
      300: {
        slidesPerView: 1,
      },
    },
  });
  /*
    const swiperWrapper = document.querySelector('.templines-gallery-slider .swiper-wrapper');
    const slides = document.querySelectorAll('.templines-gallery-slider .swiper-slide');
    const slideCount = slides.length;
    //const slideWidth = slides[0].offsetWidth;

    let isUserInteracting = false;
    let userInteractionOffset = 0;
    let lastScrollPosition = 0;
    let lastSwiperPosition = 0;

    function getScrollProgress() {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        return window.pageYOffset / maxScroll;
    }

    function updateSwiperPosition(scrollPosition) {
        const scrollProgress = getScrollProgress();
        const maxTranslate = -slideWidth * (slideCount - 4);
        let newTranslate = maxTranslate * scrollProgress;

        // Застосовуємо зміщення від взаємодії користувача
        newTranslate += userInteractionOffset;

        // Обмежуємо переміщення слайдера
        newTranslate = Math.max(maxTranslate, Math.min(0, newTranslate));

        swiperGallery.setTranslate(newTranslate);
        lastScrollPosition = scrollPosition;
        lastSwiperPosition = newTranslate;
    }

    window.addEventListener('scroll', () => {
        if (!isUserInteracting) {
            updateSwiperPosition(window.pageYOffset);
        }
    });

    swiperWrapper.addEventListener('mousedown', startInteraction);
    swiperWrapper.addEventListener('touchstart', startInteraction);

    document.addEventListener('mouseup', endInteraction);
    document.addEventListener('touchend', endInteraction);

    swiperGallery.on('slideChange', () => {
        if (isUserInteracting) {
            userInteractionOffset = swiperGallery.translate - lastSwiperPosition;
        }
    });

    function startInteraction() {
        isUserInteracting = true;
        lastSwiperPosition = swiperGallery.translate;
    }

    function endInteraction() {
        isUserInteracting = false;

        // Оновлюємо userInteractionOffset на основі поточної позиції слайдера
        const scrollProgress = getScrollProgress();
        const maxTranslate = -slideWidth * (slideCount - 4);
        const expectedTranslate = maxTranslate * scrollProgress;
        userInteractionOffset = swiperGallery.translate - expectedTranslate;

        // Плавно повертаємося до позиції скролу, зберігаючи зміщення
        gsap.to(swiperGallery, {
            duration: 0.3,
            setTranslate: swiperGallery.translate,
            onUpdate: () => updateSwiperPosition(window.pageYOffset),
            onComplete: () => {
                updateSwiperPosition(window.pageYOffset);
            }
        });
    }

    window.addEventListener('resize', () => {
        updateSwiperPosition(lastScrollPosition);
    });


    updateSwiperPosition(window.pageYOffset);*/

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".parallax-bg", {
    yPercent: -20, // Паралакс на 25% для плавного руху фону
    scale: 1.07, // Легке збільшення масштабу для ефекту об'ємності
    ease: CustomEase.create(
      "custom",
      "M0,0 C0.126,0.382 0.379,0.366 0.537,0.514 0.729,0.694 0.818,1.001 1,1 "
    ),
    scrollTrigger: {
      trigger: ".templines-video-bg",
      start: "top 95%", // Коли верх секції доходить до низу екрана
      end: "bottom top", // Коли низ секції доходить до верху екрана
      scrub: 1, // Плавний ефект, синхронізований зі скролом
      markers: false, // Приховані маркери для кращого візуального вигляду
    },
  });

  var controllerCounter = new ScrollMagic.Controller();

  $(".templines-counter").each(function () {
    var $this = $(this);
    var countTo = $this.data("count-to");
    var interval = $this.data("count-interval");
    var duration = $this.data("animation-counter");

    var originalWidth = $this.find(".counter-number").width();
    var originalHeight = $this.find(".counter-number").height();
    $this
      .find(".counter-number")
      .css("min-width", originalWidth + 5)
      .css("width", originalWidth + 5)
      .css("height", originalHeight + 10)
      .css("min-height", originalHeight + 10);

    $this.find(".counter-number").text("0");

    var tl = gsap.timeline({ paused: true });

    tl.fromTo(
      $this.find(".counter-number"),
      {
        innerHTML: 0,
      },
      {
        innerHTML: countTo,
        snap: { innerHTML: interval },
        duration: duration / 1000,
        ease: "power1.out",
        onUpdate: function () {
          $this
            .find(".counter-number")
            .text(Math.round(this.targets()[0].innerHTML));
        },
      }
    );

    new ScrollMagic.Scene({
      triggerElement: $this[0],
      triggerHook: 0.9,
      reverse: false,
    })
      .on("enter", function () {
        tl.play();
      })
      .addTo(controllerCounter);
  });

  $(".nav-search-icon-wrap").on("click", function () {
    $(".navigation-site-wrap .nav-search-form-wrap").addClass("opened");
  });
  $(".templines-close-search-form").on("click", function () {
    var header_searchForm = $(".navigation-site-wrap .nav-search-form-wrap");
    if (header_searchForm.hasClass("opened")) {
      header_searchForm.removeClass("opened");
    }
  });
});
