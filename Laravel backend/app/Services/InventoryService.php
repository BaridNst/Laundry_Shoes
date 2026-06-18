<?php

namespace App\Services;

use App\Contracts\InventoryContract;

class InventoryService
{
    protected $inventoryRepository;

    /**
     * Dependency Injection via Constructor (Service Container)
     */
    public function __construct(InventoryContract $inventoryRepository)
    {
        $this->inventoryRepository = $inventoryRepository;
    }

    public function getAllItems()
    {
        return $this->inventoryRepository->getAllItems();
    }

    public function updateStock(int $itemId, int $quantity)
    {
        return $this->inventoryRepository->updateStock($itemId, $quantity);
    }

    public function getLowStockAlerts()
    {
        return $this->inventoryRepository->getLowStockAlerts();
    }
}
