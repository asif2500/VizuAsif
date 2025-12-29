import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreVertical, Eye, Pencil, Trash, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteRestaurantAPI, getAllRestaurantAPI } from "@/apis/auth.api";
import { Label } from "@/components/ui/label";
import type { DeleteRestaurantProps, RestaurantArrayProps } from "@/lib/type";
import {
  CreateRestaurant,
  DeleteDialog,
  ViewRestaurant,
} from "@/components/dialougs";

const Restaurants = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useState<RestaurantArrayProps>([]);

  const [openAddRest, setOpenAddRest] = useState<boolean>(false);
  const [viewRest, setViewRest] = useState({ visible: false, _id: "" });

  const [deleteRestaurant, setDeleteRestaurant] =
    useState<DeleteRestaurantProps>({
      loading: false,
      visible: false,
      _id: "",
    });

  useEffect(() => {
    getAllRestaurantAPI(setRestaurants, setLoading);
  }, []);

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
              {["Name", "Phone", "Status", "Actions"].map((e) => (
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
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant._id}>
                <TableCell>{restaurant.name}</TableCell>
                <TableCell>{restaurant.phone}</TableCell>
                <TableCell>
                  <span className="text-green-600 font-medium">
                    {restaurant.subscriptionStatus}
                  </span>
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
                        { title: "View", icon: Eye },
                        { title: "Edit", icon: Pencil },
                        { title: "Paymeny", icon: CreditCard },
                        { title: "Delete", icon: Trash },
                      ].map((content) => {
                        const isDelete = content.title === "Delete";
                        return (
                          <DropdownMenuItem
                            onClick={() => {
                              if (isDelete) {
                                setDeleteRestaurant({
                                  visible: true,
                                  _id: restaurant._id,
                                  loading: false,
                                });
                              }else if (content.title === "View") {
                                setViewRest({visible:true, _id: restaurant._id,})
                              }
                            }}
                            key={content.title}
                            className={`${isDelete && "text-red-600"}`}
                          >
                            <content.icon
                              color={`${isDelete ? "#E8000B" : "black"}`}
                              className="mr-2 h-4 w-4"
                            />
                            {content.title}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CreateRestaurant
        open={openAddRest}
        onClose={() => setOpenAddRest(false)}
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
        isLoading={deleteRestaurant.loading}
        title="Delete Restaurant"
        onClose={() =>
          setDeleteRestaurant({ _id: "", loading: false, visible: false })
        }
        onAction={() =>
          deleteRestaurantAPI(deleteRestaurant._id, () =>
            setDeleteRestaurant({
              _id: "",
              loading: false,
              visible: false,
            })
          )
        }
      />
    </div>
  );
};

export default Restaurants;
