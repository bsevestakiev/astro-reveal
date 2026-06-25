  document.addEventListener("DOMContentLoaded", function () {
        // Sales-iframe loader: only present on the page that embeds it (e.g. /pricing).
        // Guard so the script no-ops on every other page.
        if (document.getElementById("salesIframe") && document.getElementById("loadingImage")) {
            setTimeout(function () {
                document.getElementById("loadingImage").style.display = "none";
                document.getElementById("salesIframe").style.display = "block";
            }, 5300);
        }

        // Initialize tooltips after a small delay
        setTimeout(initializeTooltips, 100);
    });

    function initializeTooltips() {
        console.log('Initializing tooltips...');
        const tooltipIcons = document.querySelectorAll('.tooltip-icon');
        console.log('Found tooltip icons:', tooltipIcons.length);

        tooltipIcons.forEach((icon, index) => {
            console.log(`Processing icon ${index + 1}`);

            // Get tooltip text from title or data-original-title
            let tooltipText = icon.getAttribute('title') || icon.getAttribute('data-original-title');

            if (!tooltipText) {
                console.log('No tooltip text found for icon', index + 1);
                return;
            }

            console.log(`Tooltip text for icon ${index + 1}:`, tooltipText);

            // Store the text and remove attributes to prevent conflicts
            icon.setAttribute('data-tooltip-text', tooltipText);
            icon.removeAttribute('title');
            icon.removeAttribute('data-original-title');
            icon.removeAttribute('data-toggle');
            icon.removeAttribute('data-placement');

            // Create unique tooltip element for this icon
            const tooltipId = 'custom-tooltip-' + index;
            let tooltip = document.getElementById(tooltipId);

            // Remove existing tooltip if it exists
            if (tooltip) {
                tooltip.remove();
            }

            // Create new tooltip element
            tooltip = document.createElement('div');
            tooltip.id = tooltipId;
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);

            // Show tooltip on hover
            icon.addEventListener('mouseenter', function (e) {
                console.log('🔍 Mouse enter on icon', index + 1);

                // Hide all other tooltips first
                document.querySelectorAll('.custom-tooltip').forEach(t => {
                    if (t !== tooltip) {
                        t.classList.remove('show');
                    }
                });

                // Get icon position every time (dynamic positioning)
                const rect = icon.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

                console.log('📍 Icon position:', rect);
                console.log('📜 Scroll:', { scrollTop, scrollLeft });

                // Show tooltip first to get dimensions
                tooltip.classList.add('show');
                tooltip.style.display = 'block';
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';

                // Get tooltip dimensions after showing it
                const tooltipWidth = tooltip.offsetWidth;
                const tooltipHeight = tooltip.offsetHeight;

                // Calculate position based on current icon position
                // rect.left is already relative to viewport, add scroll for absolute positioning
                let centeredLeft = rect.left + scrollLeft + (rect.width / 2) - (tooltipWidth / 2);
                // rect.top is relative to viewport, add scroll to get absolute position, then subtract tooltip height and gap
                let finalTop = rect.top + scrollTop - tooltipHeight - 10; // 10px gap above icon

                // Reset arrow position to center
                tooltip.style.setProperty('--arrow-left', '50%');

                // Check if tooltip goes off-screen horizontally and adjust
                if (centeredLeft < 10) {
                    tooltip.style.left = '10px';
                    // Adjust arrow position when tooltip is repositioned
                    const arrowOffset = (rect.left + scrollLeft + (rect.width / 2)) - 10;
                    tooltip.style.setProperty('--arrow-left', arrowOffset + 'px');
                } else if (centeredLeft + tooltipWidth > window.innerWidth - 10) {
                    const rightEdgeLeft = window.innerWidth - tooltipWidth - 10;
                    tooltip.style.left = rightEdgeLeft + 'px';
                    // Adjust arrow position when tooltip is repositioned
                    const arrowOffset = (rect.left + scrollLeft + (rect.width / 2)) - rightEdgeLeft;
                    tooltip.style.setProperty('--arrow-left', arrowOffset + 'px');
                } else {
                    tooltip.style.left = centeredLeft + 'px';
                }

                // Set vertical position
                tooltip.style.top = finalTop + 'px';

                // Apply all necessary styles
                tooltip.style.zIndex = '99999';
                tooltip.style.backgroundColor = '#2d3748';
                tooltip.style.color = '#ffffff';
                tooltip.style.padding = '12px 16px';
                tooltip.style.borderRadius = '8px';
                tooltip.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                tooltip.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)';
                tooltip.style.backdropFilter = 'blur(10px)';

                console.log('🎯 Tooltip positioned dynamically:', {
                    iconRect: rect,
                    tooltipWidth: tooltipWidth,
                    tooltipHeight: tooltipHeight,
                    finalLeft: tooltip.style.left,
                    finalTop: finalTop,
                    arrowPosition: tooltip.style.getPropertyValue('--arrow-left')
                });
            });

            // Hide tooltip on mouse leave
            icon.addEventListener('mouseleave', function () {
                console.log('🚪 Mouse leave on icon', index + 1);
                tooltip.classList.remove('show');

                // Use setTimeout to allow enhanced animation to complete before force hiding
                setTimeout(() => {
                    if (!tooltip.classList.contains('show')) {
                        tooltip.style.opacity = '0';
                        tooltip.style.visibility = 'hidden';
                        tooltip.style.display = 'none';
                    }
                }, 300); // Match enhanced animation duration

                console.log('❌ Removed show class from tooltip with enhanced smooth animation');
            });

            // Hide tooltip on click elsewhere
            document.addEventListener('click', function (e) {
                if (!icon.contains(e.target) && !tooltip.contains(e.target)) {
                    tooltip.classList.remove('show');
                    setTimeout(() => {
                        if (!tooltip.classList.contains('show')) {
                            tooltip.style.opacity = '0';
                            tooltip.style.visibility = 'hidden';
                            tooltip.style.display = 'none';
                        }
                    }, 300); // Match enhanced animation duration
                }
            });
        });

        // Additional global handler to hide all tooltips on any click
        document.addEventListener('click', function () {
            document.querySelectorAll('.custom-tooltip').forEach(tooltip => {
                tooltip.classList.remove('show');
                setTimeout(() => {
                    if (!tooltip.classList.contains('show')) {
                        tooltip.style.opacity = '0';
                        tooltip.style.visibility = 'hidden';
                        tooltip.style.display = 'none';
                    }
                }, 300); // Match enhanced animation duration
            });
        });
    }