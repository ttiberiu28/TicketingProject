package constant;

public class Constant {

    private Constant() {}

    /*
            CONTROLLER MAPPING
         */
    public static final String MOVIE_CONTROLLER = "/api/movie";
    public static final String TICKET_CONTROLLER = "/api/ticket";
    public static final String LOCATION_CONTROLLER = "/api/location";
    public static final String STAND_UP_CONTROLLER = "/api/standup";
    public static final String SPECIAL_GUEST_CONTROLLER = "/api/specialGuest";
    public static final String USER_CONTROLLER = "/api/user";
    public static final String ROLE_CONTROLLER = "/api/role";

    public static final String CONCERT_CONTROLLER = "/api/concert";

    /*
        MAPPING PATHS
     */

    public static final String LOGIN = "/login";
    public static final String LIST = "/list";
    public static final String NEW = "/new";
    public static final String ASSIGN_TICKET = "/ticketAssignation";
    public static final String ASSIGN_LOCATION = "/locationAssignation";
    public static final String DELETION = "/deletion/{id}";
    public static final String ASSIGN_ROLE = "/roleAssignation";
    public static final String ASSIGN_SPECIAL_GUEST = "/specialGuestAssignation";

    /*
        OTHER CONSTANTS
     */
    public static final String ALL_API = "/api/**";
    public static final String ADMIN_ROLE = "admin";

    public static final String USER_ROLE = "user";
}
