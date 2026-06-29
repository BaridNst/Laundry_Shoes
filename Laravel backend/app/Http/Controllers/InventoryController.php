<?php

namespace App\Http\Controllers;

use App\Services\InventoryService;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    protected $inventoryService;

    public function __construct(InventoryService $inventoryService)
    {
        $this->inventoryService = $inventoryService;
    }

    public function index()
    {
        $items = $this->inventoryService->getAllItems();
        return response()->json($items);
    }

    public function updateStock(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer',
        ]);

        $item = $this->inventoryService->updateStock($id, $validated['quantity']);

        return response()->json([
            'status' => 'sukses',
            'pesan' => 'Stok berhasil diupdate',
            'data' => $item
        ]);
    }

    public function lowStockAlerts()
    {
        $alerts = $this->inventoryService->getLowStockAlerts();
        return response()->json($alerts);
    }
}
