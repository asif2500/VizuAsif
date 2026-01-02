import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  DeleteDialog,
  ViewRestaurant,
  CreateRestaurant,
} from "@/components/dialougs";
import {
  Box,
  Eye,
  Pencil,
  Trash,
  CreditCard,
  MoreVertical,
  Plus,
  PlusCircle,
} from "lucide-react";
import {
  deleteRestaurantAPI,
  getAllRestaurantAPI,
} from "@/apis/restaurant.api";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { DeleteRestaurantProps } from "@/lib/type";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import EditRestaurant from "@/components/dialougs/editRestaurant";
import type { RestaurantType } from "@/redux/slices/restaurantSlice";
import RestaurantModels from "@/components/dialougs/restaurantModels";
import ApplyForModel from "@/components/dialougs/apply-for-model";

const Restaurants = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.restaurant);

  const [openAddRest, setOpenAddRest] = useState<boolean>(false);
  const [viewRest, setViewRest] = useState({ visible: false, _id: "" });
  const [restModels, setRestModels] = useState({ visible: false, _id: "" });
  const [applyForModel, setApplyForModel] = useState<{
    visible: boolean;
    restaurantID: string;
    models?: any[];
  }>({
    visible: false,
    restaurantID: "",
    models: [],
  });
  const [editRest, setEditRest] = useState<{
    visible: boolean;
    _id: string;
    data: RestaurantType | null;
  }>({ visible: false, _id: "", data: null });

  const [deleteRestaurant, setDeleteRestaurant] =
    useState<DeleteRestaurantProps>({
      visible: false,
      _id: "",
    });

  const handleDelete = () => {
    dispatch(deleteRestaurantAPI(deleteRestaurant._id, setDeleteRestaurant));
  };

  useEffect(() => {
    getAllRestaurantAPI()(dispatch);
  }, [dispatch]);

  return (
    <div className="p-6 ">
      <div className="flex row-auto justify-between">
        <Label className="text-2xl font-semibold mb-6">
          {loading ? "Loading" : "Restaurants"}
        </Label>
        <Button onClick={() => setOpenAddRest(true)} variant={"default"}>
          + Restaurant
        </Button>
      </div>
      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "Name",
                "Phone",
                "Status",
                "Total Models",
                "Active Models",
                "Actions",
              ].map((e) => (
                <TableHead
                  className={`text-${e === "Actions" ? "right" : "left"}`}
                  key={e}
                >
                  {e}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {list.map((restaurant: RestaurantType) => {
              return (
                <TableRow key={restaurant._id}>
                  <TableCell>{restaurant.name}</TableCell>
                  <TableCell>{restaurant.phone}</TableCell>
                  <TableCell>
                    <span className="text-green-600 font-medium">
                      {restaurant.subscriptionStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    {restaurant?.models &&
                    restaurant.models
                      .map((model) => model.count)
                      .reduce((a, c) => a + c, 0) > 0
                      ? restaurant.models.reduce(
                          (acc, model) => acc + model.count,
                          0
                        )
                      : 0}
                  </TableCell>
                  <TableCell>
                    {restaurant?.models &&
                    restaurant.models
                      .filter((model) => model.isActive)
                      .length > 0 ? (
                      restaurant.models
                        .filter((model) => model.isActive)
                        .length
                    ) : (
                      <Button
                        onClick={() =>
                          setApplyForModel({
                            restaurantID: restaurant._id,
                            visible: true,
                          })
                        }
                        className=""
                      >
                        Apply
                      </Button>
                    )}
                  </TableCell>

                  {/* Actions Tooltip */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        {[
                          {
                            title: "View",
                            icon: Eye,
                            onClick: () =>
                              setViewRest({
                                visible: true,
                                _id: restaurant._id,
                              }),
                          },
                          {
                            title: "Models",
                            icon: Box,
                            onClick: () =>
                              setRestModels({
                                visible: true,
                                _id: restaurant._id,
                              }),
                          },
                          restaurant?.models && restaurant.models.length > 0
                            ? {
                                title: "Add more models",
                                icon: PlusCircle,
                                onClick: () =>
                                  setApplyForModel({
                                    visible: true,
                                    restaurantID: restaurant._id,
                                  }),
                              }
                            : {
                                title: "Apply for model",
                                icon: Plus,
                                onClick: () =>
                                  setApplyForModel({
                                    visible: true,
                                    restaurantID: restaurant._id,
                                  }),
                              },
                          {
                            title: "Edit",
                            icon: Pencil,
                            onClick: () =>
                              setEditRest({
                                visible: true,
                                _id: restaurant._id,
                                data: restaurant,
                              }),
                          },
                          {
                            title: "Paymeny",
                            icon: CreditCard,
                            onClick: () =>
                              navigate(
                                `/admin/payment/restaurants?code=${restaurant._id}`
                              ),
                          },
                          {
                            title: "Delete",
                            icon: Trash,
                            onClick: () =>
                              setDeleteRestaurant({
                                visible: true,
                                _id: restaurant._id,
                              }),
                          },
                        ]
                          .filter(Boolean)
                          .map((content) => (
                            <DropdownMenuItem
                              key={content.title}
                              onClick={content.onClick}
                              className={`${
                                content.title === "Delete" && "text-red-600"
                              }`}
                            >
                              <content.icon
                                color={`${
                                  content.title === "Delete"
                                    ? "#E8000B"
                                    : "black"
                                }`}
                                className="mr-2 h-4 w-4"
                              />
                              {content.title}
                            </DropdownMenuItem>
                          ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <CreateRestaurant
        open={openAddRest}
        onClose={() => setOpenAddRest(false)}
      />
      <ApplyForModel
        onClose={() => setApplyForModel({ restaurantID: "", visible: false })}
        restaurantID={applyForModel.restaurantID}
        open={applyForModel.visible}
      />
      <EditRestaurant
        id={editRest._id}
        data={editRest.data}
        open={editRest.visible}
        onClose={() => setEditRest({ visible: false, _id: "", data: null })}
      />

      <RestaurantModels
        id={restModels._id}
        open={restModels.visible}
        onClose={() => setRestModels({ visible: false, _id: "" })}
      />

      <ViewRestaurant
        id={viewRest._id}
        open={viewRest.visible}
        onClose={() => setViewRest({ visible: false, _id: "" })}
      />
      <DeleteDialog
        open={deleteRestaurant.visible}
        actionText="Delete"
        description="This action can not be undone"
        isLoading={loading}
        title="Delete Restaurant"
        onClose={() => setDeleteRestaurant({ _id: "", visible: false })}
        onAction={handleDelete}
      />
    </div>
  );
};

export default Restaurants;
