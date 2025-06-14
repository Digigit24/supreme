(function ($) {
  "use strict";
  var $window = $(window);
  var startMegaMenu = function () {
    $(".fl-mega-menu").accessibleMegaMenu({
      /* prefix for generated unique id attributes, which are required
                to indicate aria-owns, aria-controls and aria-labelledby */
      uuidPrefix: "accessible-megamenu",
      /* css class used to define the megamenu styling */
      menuClass: "nav-menu",
      /* css class for a top-level navigation item in the megamenu */
      topNavItemClass: "nav-item",
      /* css class for a megamenu panel */
      panelClass: "sub-nav",
      /* css class for a group of items within a megamenu panel */
      panelGroupClass: "sub-nav-group",
      /* css class for the hover state */
      hoverClass: "hover",
      /* css class for the focus state */
      focusClass: "focus",
      /* css class for the open state */
      openClass: "open",
    });
  };
  // Start
  $("document").ready(function () {
    startMegaMenu();

    var $sub_nav_mega_menu_item = $(".templines-header .mega-menu-item");
    if ($sub_nav_mega_menu_item.length !== 0) {
      $sub_nav_mega_menu_item.each(function () {
        var $self = $(this);

        if (
          $self.hasClass("has-submenu") &&
          !$self.hasClass("sub-menu-full-width")
        ) {
          $self.find("ul.sub-menu-wide").each(function () {
            var $ul = $(this),
              max_columns = parseInt($ul.data("max-columns"), 10) || 1, // Кількість колонок
              $children = $ul.find(">li").slice(0, max_columns), // Вибрати перші N елементів
              total_width = 0; // Початкова ширина
            // Підрахунок ширини для N колонок
            console.log($children.outerWidth(true));
            $children.each(function (index) {
              var item_width = $(this).outerWidth(true); // Ширина поточного елемента
              console.log("Елемент", index + 1, "ширина:", item_width);
              total_width += item_width; // Додаємо ширину до загальної
            });

            console.log("Кількість колонок:", max_columns);
            console.log("Обчислена загальна ширина:", total_width);

            // Установка ширини ul
            if (total_width > 0) {
              $ul.css({
                width: total_width + 5,
              });
            }
          });
        }
      });
    }
  });
})(jQuery);
