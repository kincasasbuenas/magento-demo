<?php
// Asegúrate de usar el namespace correcto
namespace Kinuz\CriticalCss\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;
use Magento\Framework\View\LayoutInterface;
use Magento\Framework\View\Asset\Repository as AssetRepository;

class Inliner extends Template
{
    protected $_layout;
    protected $_assetRepo;

    /**
     * Mapeo de layout handles a nuestros archivos CSS críticos.
     * Recuerda que estos archivos (home.css, category.css) los genera
     * tu script de Node (Parte 1) y deben estar en el directorio 
     * 'web/css/critical/' de tu TEMA (Colombia/barranquilla).
     */
    private $handleToFileMap = [
        'cms_index_index'       => 'css/critical/home.css',
        //'catalog_category_view' => 'css/critical/category.css',
        //'catalog_product_view'  => 'css/critical/product.css',
        // 'default' se usa como fallback si no hay coincidencias
        'default'               => 'css/critical/home.css' 
    ];

    public function __construct(
        Context $context,
        LayoutInterface $layout,
        AssetRepository $assetRepo,
        array $data = []
    ) {
        $this->_layout = $layout;
        $this->_assetRepo = $assetRepo;
        parent::__construct($context, $data);
    }

    /**
     * Obtiene el contenido del CSS crítico basado en el layout handle actual.
     *
     * @return string
     */
    public function getCriticalCssContent(): string
    {
        $handles = $this->_layout->getUpdate()->getHandles();
        $fileToLoad = $this->handleToFileMap['default']; // Fallback

        // Buscar el handle más específico que coincida
        foreach ($this->handleToFileMap as $handle => $file) {
            if (in_array($handle, $handles)) {
                $fileToLoad = $file;
                break; 
            }
        }

        try {
            // Usamos AssetRepository para resolver correctamente la ruta del tema
            // Esto buscará el archivo en el tema activo (Colombia/barranquilla)
            $asset = $this->_assetRepo->createAsset($fileToLoad);
            return $asset->getContent();
        } catch (\Exception $e) {
            // Si el archivo no existe o falla, no rompemos la página
            $this->_logger->critical('Archivo CSS Crítico no encontrado: ' . $fileToLoad);
            return '';
        }
    }
}